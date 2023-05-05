import Gallery from "../Gallery/Gallery";

const ItemPerPage = ({ currentItems }) => {
  return (
    <div className="row products">
      {currentItems &&
        currentItems.map((item) => {
          return (
            <div className="col-lg-4 col-md-6" key={item.id}>
              <Gallery
                key={item?.id}
                id={item?.id}
                image={"http://" + item?.product_images[0]?.uri}
                name={item?.name}
                price={item?.price}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ItemPerPage;
