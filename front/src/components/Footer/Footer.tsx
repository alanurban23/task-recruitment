const Footer = () => {
  return (
    <footer className="bg-primary text-center lg:text-left mt-8">
      <div className="container p-6 text-white">
        <div className="grid lg:grid-cols-2 gap-4">
          <div className="mb-6 md:mb-0">
            <h5 className="font-medium mb-2 uppercase">Footer text</h5>

            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </p>
          </div>

          <div className="mb-6 md:mb-0">
            <h5 className="font-medium mb-2 uppercase">Footer text</h5>

            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              atque ea quis molestias. Fugiat pariatur maxime quis culpa
              corporis vitae repudiandae aliquam voluptatem veniam, est atque
              cumque eum delectus sint!
            </p>
          </div>
        </div>
      </div>

      <div
        className="text-center text-white p-4 flex gap-2 justify-center"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <p className="text-white">Klaudiusz Biegacz</p>
      </div>
    </footer>
  );
};

export default Footer;
