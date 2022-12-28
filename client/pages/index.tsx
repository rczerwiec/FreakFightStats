import Table from "../components/Table";

export default function Home(props: any) {

  return (
    <div className="text-center h-screen">
      <div className="flex flex-col my-auto">
        <h2>Ranking FreakFight</h2>
        <Table players={props.data}/>
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:5000/player");
  const data = await response.json();

  return {
    props: { data },
  };
};
