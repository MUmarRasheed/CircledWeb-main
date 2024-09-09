import { useEffect, useState } from "react";
import Input from "./common/Input";
import Popup from "./common/Popup";
import "./AddProduct.scss";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  useParams,
} from "react-router-dom";
import MultiSelect from "./common/MultiSelect";
import MultiInput from "./common/MultiInput";
import RemovableText from "./common/RemovableText";
import RemovableImage from "./common/RemovableImage";
import Button from "./common/Button";
import CategoryContainer from "./common/CategoryContainer";
import {
  addProduct,
  Category,
  getProductById,
  Product,
  updateProductById,
  uploadProductPicture,
} from "../services/products";
import { useAppSelector } from "../store/hooks";
import Loading from "./common/Loading";
import PicChooser from "./common/PicChooser";

function AddProduct({ edit = false }: { edit?: boolean }) {
  const [categoryPopupOpen, setCategoryPopupOpen] = useState(false);
  const [type, setType] = useState<"rent" | "buy" | "both" | "">("");
  const [colors, setColors] = useState<string[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const categories = useAppSelector((state) => state.category.data);
  const navigation = useNavigation();
  const actionData: any = useActionData();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const { id } = useParams();

  function closeCategoryPopup() {
    setCategoryPopupOpen(false);
  }

  useEffect(() => {
    if (!edit || !id) return;

    async function fetchProduct() {
      if (!id) return;
      const res = await getProductById(id);
      setProduct(res.data);

      let pro: Product = res.data;
      // console.log(pro);

      assignType(pro.type === "both" ? ["rent", "buy"] : [pro.type]);
      setCategory(pro.category);
      setColors(pro.colors || []);
      setSizes(pro.sizes || []);
      setImages(pro.images || []);
    }

    fetchProduct();
  }, []);

  function assignType(selected: string[]) {
    if (selected.length === 1) {
      setType(selected[0] as any);
    } else if (selected.length === 2) {
      setType("both");
    } else {
      setType("");
    }
  }

  useEffect(() => {
    if (actionData?.data) {
      navigate("/products/" + actionData?.data?._id);
      // console.log("/products/" + actionData?.data?._id);
    }
  }, [actionData]);

  if (edit && !product) return <Loading></Loading>;

  return (
    <div id="add-product-form">
      <h1 className="advent center title">{edit ? "Edit" : "Add"} Product</h1>
      <div className="form-container">
        {actionData?.error && (
          <p className="error-msg">{actionData?.message}</p>
        )}
        <Form
          method="post"
          action={"/profile/my-products/" + (edit ? product?._id : "new")}
        >
          {edit && (
            <>
              <input type="hidden" name="_id" value={product?._id} />
            </>
          )}
          <input type="hidden" name="edit" value={edit.toString()} />
          <Input
            name="name"
            label="Name"
            required
            type="text"
            defaultValue={product?.name}
          ></Input>
          <Input
            name="retailPrice"
            label="Retail Price"
            required
            type="number"
            defaultValue={product?.retailPrice}
          ></Input>
          <Input
            name="rentPrice"
            label="Rent Price"
            required
            type="number"
            defaultValue={product?.rentPrice}
          ></Input>
          <Input
            name="costPrice"
            label="Cost Price"
            required
            type="number"
            defaultValue={product?.costPrice}
          ></Input>
          <input type="hidden" name="type" value={type} />
          {(!edit || (edit && product)) && (
            <MultiSelect
              options={["rent", "buy"]}
              onChange={assignType}
              label="Type"
              initial={
                product?.type === "both"
                  ? ["buy", "rent"]
                  : [product?.type as any]
              }
            ></MultiSelect>
          )}
          <div className="field-desc">
            <p>Description</p>
            <textarea
              name="description"
              className="textarea-desc"
              maxLength={1000}
              defaultValue={product?.description}
            ></textarea>
          </div>
          <Input
            label="Stock"
            name="stock"
            type="number"
            required
            defaultValue={product?.stock}
          ></Input>
          <div className="category-select">
            <input type="hidden" name="category" value={category?._id} />
            <p>Category</p>
            <div className="cat-wrap flex space-between align-items-center">
              <div className="category">
                <p>
                  <strong>{category?.name || "No Category Selected"}</strong>
                </p>
              </div>
              <button
                onClick={() => {
                  setCategoryPopupOpen(true);
                }}
                type="button"
                className="outline-btn"
              >
                Select Category
              </button>
            </div>
          </div>
          <MultiInput
            DataDisplay={RemovableText}
            onChange={(data) => {
              setColors(data);
            }}
            label="Colors"
            initial={colors}
          />
          <input type="hidden" name="colors" value={JSON.stringify(colors)} />

          <input type="hidden" name="images" value={JSON.stringify(images)} />
          <MultiInput
            DataDisplay={RemovableText}
            onChange={(data) => {
              setSizes(data);
            }}
            label="Sizes"
            initial={sizes}
          />
          <input type="hidden" name="sizes" value={JSON.stringify(sizes)} />
          <div className="field-desc">
            <p>Style Notes</p>
            <textarea
              name="styleNotes"
              className="textarea-desc"
              maxLength={1000}
              defaultValue={product?.styleNotes}
            ></textarea>
            <MultiInput
              DataDisplay={RemovableImage}
              onChange={(data) => {
                setImages(data);
              }}
              label="Images"
              initial={images}
              Inputer={ImageAdder}
            />
          </div>
          <Button loading={navigation.state === "submitting"}>
            {edit ? "Save Changes" : "Add Product"}
          </Button>
        </Form>
      </div>

      <Popup open={categoryPopupOpen} close={closeCategoryPopup}>
        <h2 className="advent center">Select Product Category</h2>
        <div className="category-container flex">
          {categories?.map((category, i) => (
            <CategoryContainer
              category={category}
              key={category._id}
              onClick={(category: Category) => {
                setCategory(category);
                closeCategoryPopup();
              }}
            ></CategoryContainer>
          ))}
        </div>
      </Popup>
    </div>
  );
}

export default AddProduct;

function ImageAdder({ onData }: { onData: (val: string) => void }) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  // const [profilePic, setProfilePic] = useState("");
  const [uploadErr, setUploadErr] = useState("");

  function closePopup() {
    if (imageUploading) return;
    setPopupOpen(false);
  }

  async function handleFileUpload(image: any) {
    setUploadErr("");
    setImageUploading(true);
    try {
      const res = await uploadProductPicture(image);
      // setProfilePic(res.data.url);
      onData(res.data.url);
      closePopup();
      // setProfilePic("");
    } catch (e: any) {
      setUploadErr(
        e?.data?.message ||
          e?.message ||
          "Something went wrong with the upload. Please try again"
      );
    }
    setImageUploading(false);
  }

  return (
    <div className="image-add">
      <p>Product Images</p>
      <button
        className="outline-btn"
        type="button"
        onClick={() => setPopupOpen(true)}
      >
        Add Image
      </button>

      <Popup open={popupOpen} close={closePopup}>
        <h1 className="advent">Upload Product Picture</h1>
        <p>Select an picture to upload!</p>
        {uploadErr && (
          <>
            <br />
            <p className="error-msg">{uploadErr}</p>
          </>
        )}
        {popupOpen && (
          <PicChooser
            uploading={imageUploading}
            initial={""}
            onUpload={handleFileUpload}
            message="Uploading product image. Please wait..."
          ></PicChooser>
        )}
      </Popup>
    </div>
  );
}

export async function addProductAction({ request }: any) {
  try {
    const data = await request.formData();

    const edit: boolean = data.get("edit") === "true";

    const product: any = {
      name: data.get("name") as string,
      retailPrice: data.get("retailPrice") as string,
      rentPrice: data.get("rentPrice") as string,
      costPrice: data.get("costPrice") as string,
      type: data.get("type") as string,
      description: data.get("description") as string,
      stock: data.get("stock") as string,
      colors: JSON.parse(data.get("colors") as string),
      images: JSON.parse(data.get("images") as string),
      sizes: JSON.parse(data.get("sizes") as string),
      category: data.get("category") as string,
      styleNotes: data.get("styleNotes") as string,
    };

    let response;

    if (edit) {
      const _id = data.get("_id");
      if (!_id) throw new Error("Product does not exist!");
      response = await updateProductById(_id, product);
    } else {
      response = await addProduct(product);
    }

    return {
      error: false,
      data: response?.data,
      message: "Product Added Successfully",
    };
  } catch (error: any) {
    return {
      error: true,
      data: error?.data,
      message:
        error?.response?.data?.message ||
        error?.message ||
        "Something Went Wrong",
    };
  }
}
