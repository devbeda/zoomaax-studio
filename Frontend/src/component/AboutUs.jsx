import React from "react";
import * as motion from "motion/react-client";

function AboutUs() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeIn" }}
      className="min-h-screen bg-black text-gray-300 pt-24 px-4"
    >
      <div className="flex justify-center items-center">
        <h1 className=" tracking-wider text-2xl border-b-2 font-heading-font border-gray-400 fonts ">
          WHO ARE WE <span className="text-customOrange">?</span>
        </h1>
      </div>
      <div className="mt-3">
        <p className="font-para-font tracking-wider text-xs md:text-sm">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem
          laborum blanditiis, similique minus mollitia atque totam ipsa ex
          deleniti sit repellat quia ducimus laudantium! Obcaecati nemo dicta
          enim ut numquam. Perferendis repudiandae quas vero placeat a aliquid
          quod rem consequuntur, dolor laboriosam asperiores tenetur itaque
          unde, vel eaque amet enim officia quibusdam ullam, modi neque
          architecto molestiae omnis dolore. Animi. Ipsum exercitationem totam
          dicta vel quae. Corrupti saepe voluptate consequuntur incidunt
          laudantium magnam autem aliquid fugit, asperiores vel a, itaque
          dolores omnis corporis quaerat voluptas atque eligendi ullam harum
          dolorem. Quam, accusamus error perferendis quis expedita ullam
          laboriosam voluptatem molestias, animi eius tenetur nemo officiis fuga
          voluptatum nisi eveniet doloremque fugiat repellat voluptate
          repellendus tempora aut? Aperiam ipsam rerum aliquid. Excepturi
          veritatis laboriosam praesentium quae deleniti quisquam tempore,
          perspiciatis repellat, itaque quasi nam, ad velit nemo architecto.
          Dignissimos consectetur, quo assumenda earum, harum quam
          exercitationem nihil quae accusamus quisquam aliquid!
        </p>
      </div>
    </motion.div>
  );
}

export default AboutUs;
