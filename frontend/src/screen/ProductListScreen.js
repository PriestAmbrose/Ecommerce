import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../node_modules/@material-ui/core/index";
import {
  createProduct,
  deleteProduct,
  listProducts,
} from "../actions/productAction";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";
import "./ProductListScreen.css";

function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      props.history.push(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(listProducts());
  }, [createdProduct, dispatch, props.history, successCreate, successDelete]);

  const deleteHandler = (product) => {
    if (window.confirm("Are you sure you want to delete product?"))
    dispatch(deleteProduct(product._id));
  };
  const createHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <Button type="button" className="create" onClick={createHandler}>
          Create Product
        </Button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}

      {/* while loadingcreate render loadingbox, if there is an error render messageBox  */}
      {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

      {/* if data is loading show loadingBox otherwise show messageBox if there is an error otherwise render table */}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td className="row__button">
                  <Button
                    type="button"
                    className="small-edit"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    type="button"
                    className="small-delete"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ProductListScreen;
