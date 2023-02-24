import Gallery from "../Gallery/Gallery";

const ItemPerPage = ({ currentItems }) => {
  return (
    <div className="row products">
      {currentItems &&
        currentItems.map((item) => {
          return (
            <div className="col-lg-4 col-md-6" key={item.id}>
              <Gallery
                id={item.id}
                image={
                  "http://localhost:8080/api/v1/image_product/" + item.image
                }
                name={item.name}
                price={item.price}
                discount={item.discount}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ItemPerPage;
