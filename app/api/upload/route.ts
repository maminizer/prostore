import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid';
import PDFParser from 'pdf2json';
import { processInvoiceAndUpdateStock } from '@/lib/actions/product.actions'; // Adjust path

// Function to extract product details from parsed text
function extractProductDetails(text: string) {
  const products: Array<{ productName: string; quantity: number }> = [];

  const lines = text.split('\n');

  const headerIndex = lines.findIndex(
    (line) =>
      line.includes('Product Name') &&
      line.includes('Unit Price') &&
      line.includes('Quantity')
  );

  if (headerIndex === -1) {
    console.log('Product table header not found');
    return products;
  }

  for (let i = headerIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();

    if (
      (line.includes('Total') && line.includes('$')) ||
      line.includes('Payment') ||
      line.includes('Thank you') ||
      line === ''
    ) {
      break;
    }

    const productMatch = line.match(
      /^(.+?)\$[\d,]+\.[\d]+(\d+)\$[\d,]+\.[\d]+$/
    );

    if (productMatch) {
      const productName = productMatch[1].trim();
      const quantity = parseInt(productMatch[2]);

      if (productName && !isNaN(quantity)) {
        products.push({
          productName: productName,
          quantity: quantity,
        });
      }
    }
  }

  return products;
}

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFiles = formData.getAll('filepond');
  let fileName = '';
  let productDetails: Array<{ productName: string; quantity: number }> = [];
  let updateResults = null;

  if (uploadedFiles && uploadedFiles.length > 0) {
    const uploadedFile = uploadedFiles[1];
    console.log('Uploaded file:', uploadedFile);

    if (uploadedFile instanceof File) {
      fileName = uuidv4();
      const tempFilePath = `/tmp/${fileName}.pdf`;
      const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());
      await fs.writeFile(tempFilePath, fileBuffer);

      try {
        const parsedText = await new Promise<string>((resolve, reject) => {
          const pdfParser = new (PDFParser as any)(null, 1);

          pdfParser.on('pdfParser_dataError', (errData: any) => {
            console.log(errData.parserError);
            reject(errData.parserError);
          });

          pdfParser.on('pdfParser_dataReady', () => {
            const text = (pdfParser as any).getRawTextContent();
            console.log('Parsed text:', text);
            resolve(text);
          });

          pdfParser.loadPDF(tempFilePath);
        });

        // Extract product details from parsed text
        productDetails = extractProductDetails(parsedText);
        console.log('Extracted products:', productDetails);

        // Update product quantities in database
        if (productDetails.length > 0) {
          updateResults = await processInvoiceAndUpdateStock(productDetails);
          console.log('Update results:', updateResults);
        }
      } catch (error) {
        console.error('Error processing PDF:', error);
      } finally {
        // Clean up temporary file
        try {
          await fs.unlink(tempFilePath);
        } catch (error) {
          console.log('Error deleting temp file:', error);
        }
      }
    } else {
      console.log('Uploaded file is not in the expected format.');
    }
  } else {
    console.log('No files found.');
  }

  // Return comprehensive response
  return NextResponse.json({
    success: true,
    fileName: fileName,
    extractedProducts: productDetails,
    productSummary: productDetails.reduce(
      (acc, product) => {
        acc[product.productName] = product.quantity;
        return acc;
      },
      {} as Record<string, number>
    ),
    stockUpdateResults: updateResults,
  });
}
