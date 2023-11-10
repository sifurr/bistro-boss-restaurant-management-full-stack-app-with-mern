        
        
const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="text-center md:w-3/12 mx-auto  my-8">
          <p className="text-[#D99904] mb-2 capitalize">---{subHeading}---</p>
          <h3 className="text-3xl py-4 border-y-4 uppercase">{heading}</h3>
        </div>
    );
};

export default SectionTitle;