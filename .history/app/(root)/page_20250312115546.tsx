const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const HomePage = async () => {
  await delay(2000);
  return <>Prostore</>;
};

export default HomePage;
