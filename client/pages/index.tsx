import Table from "../components/Table";
import { motion } from "framer-motion";

export default function Home(props: any) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center h-screen "
    >
      <div className=" flex flex-col my-auto bg-gray">
        <h2 className="text-xl text-white bg-black p-4 font-bold">
          Ranking FreakFight w Polsce
        </h2>
        <div className="flex justify-center ">
          <Table players={props.data} />
        </div>
      </div>
    </motion.div>
  );
}

export const getServerSideProps = async () => {
  const response = await fetch("http://5.189.184.91:5000/players");
  const data = await response.json();

  return {
    props: { data },
  };
};
