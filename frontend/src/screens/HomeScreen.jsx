import { DefaultAccordion } from "../components/Accordion";
import { DefaultImg } from "../components/DefaultImage";
import { CardDefault } from "../components/CardDefault";
import { DefaultGallery } from "../components/Gallery.jsx";


const HomeScreen = () => {
  return (
    <>
      <DefaultImg />

      {/* Flexbox layout for 4 cards in a row */}
      <div className="flex flex-wrap justify-between gap-6 p-6">
        <CardDefault />
        <CardDefault />
        <CardDefault />
      </div>

      <div className="mt-16">
      <DefaultAccordion />
      </div>

      
    </>
  );
};

export default HomeScreen;
