import { Parallax } from 'react-parallax';

const Cover = ({ img, title, subHeading }) => {
    return (
        <Parallax
            blur={{ min: -50, max: 50 }}
            bgImage={img}
            bgImageAlt="menu"
            strength={-200}
        >           
            <div className="hero h-[600px]">                
                <div className="hero-content text-center bg-black opacity-70 px-40 py-10 text-neutral-content">
                    <div className="max-w-md">
                        <h1 className="mb-5 text-7xl uppercase font-bold">{title}</h1>
                        <p className="mb-5">{subHeading}</p>
                    </div>
                </div>
            </div>
        </Parallax>

    );
};

export default Cover;