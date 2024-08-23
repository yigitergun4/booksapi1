import {
  Card,
  Image,
  Text,
  Grid,
  Group,
  Badge,
  Button,
  Modal,
  NumberInput,
  TextInput,
} from "@mantine/core";
import {
  useForm,
  isNotEmpty,
  isEmail,
  isInRange,
  hasLength,
  matches,
} from "@mantine/form";
import { useState, useEffect, useContext, useRef } from "react";
import { IconShoppingCartX, IconShoppingCartPlus } from "@tabler/icons";
import appcss from "../App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../Context/UserContext";
import { useDisclosure } from "@mantine/hooks";

function ShoppingCardDetail() {
  const [cartItems, setCartItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const { darkModeAppshel, setdarkModeAppshel } = useContext(UserContext);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);
  useEffect(() => {
    const totalCount = cartItems.reduce((acc, book) => {
      return acc + book.quantity;
    }, 0);
    setTotalCount(totalCount);
  }, [cartItems]);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      adress: "",
      email: "",
      age: 18,
    },

    validate: {
      name: hasLength({ min: 5, max: 30 }, "Name must be 5-30 characters long"),

      adress: isNotEmpty("Address cannot be empty"),

      email: isEmail("Invalid email address"),

      age: isInRange({ min: 18, max: 99 }, "Age must be between 18 and 99"),
    },
  });

  const notifyError = () =>
    toast.error("Selected book removed from basket", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      progress: undefined,
    });
  const notifyErrorAll = () => {
    toast.error("All books removed from basket", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      progress: undefined,
    });
  };
  const notifyAllSelectedBooksRemoved = () => {
    toast.error("All selected books removed from basket", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      progress: undefined,
    });
  };

  const notifySuccess = () =>
    toast.success("Selected book added to the basket", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      progress: undefined,
    });
  const removeOneFromCard = (bookId) => {
    let updatedItems = cartItems.map((book) => {
      if (book.id === bookId && book.quantity > 0) {
        return { ...book, quantity: book.quantity - 1 };
      }
      return book;
    });
    updatedItems = updatedItems.filter((book) => book.quantity > 0);
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    notifyError();
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const values = form.getValues();
    console.log("Form Values:", values);
  };
  const removeItemFromCart = (bookId) => {
    const updatedItems = cartItems.filter((book) => {
      return book.id !== bookId;
    });
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    notifyAllSelectedBooksRemoved();
  };
  const formRef = useRef(null);

  const notifyBuy = () => {
    toast.success("Your order has been received", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      progress: undefined,
    });
    formRef.current.reset();
    localStorage.removeItem("cartItems");
    setFormattedAmount(0);
    setTotalCount(0);
  };
  const addOneMoreToCart = (bookId) => {
    const updatedItems = cartItems.map((book) => {
      if (book.id === bookId) {
        return { ...book, quantity: book.quantity + 1 };
      }
      return book;
    });
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    notifySuccess();
  };
  const amount = cartItems.reduce((acc, book) => {
    return acc + (book.saleInfo.listPrice?.amount || 0) * (book.quantity || 0);
  }, 0);
  const [formattedAmount, setFormattedAmount] = useState("");
  useEffect(() => {
    const formatted = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    setFormattedAmount(formatted);
  }, [amount]);
  const clearBasket = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    notifyErrorAll();
  };

  return JSON.parse(localStorage.getItem("cartItems")) ? (
    <div
      style={{
        display: "flex",
        backgroundColor: darkModeAppshel ? null : "black",
        transition: "all 0.3s linear",
      }}
    >
      <div
        style={{
          margin: 20,
        }}
      >
        {cartItems.map((book) => (
          <Card
            key={book.id}
            shadow="xl"
            padding="lg"
            radius="md"
            mb="md"
            withBorder
            style={{
              width: 1000,
            }}
          >
            <Grid
              justify="flex-start"
              ml="xs"
              mt="xs"
              align="flex-start"
              gutter={{ base: 5, xs: "md", md: "xl", xl: 50 }}
            >
              <Grid.Col span={{ base: 1, md: 2, lg: 2 }}>
                <Card.Section mb="sm">
                  <Image src={book.volumeInfo.imageLinks.thumbnail} />
                </Card.Section>
              </Grid.Col>

              <Group mb="xs">
                <div style={{ marginLeft: 25 }}>
                  <div>
                    <Text fw={700}>{book.volumeInfo.title}</Text>
                  </div>
                  <div>
                    <Text>
                      Author:{" "}
                      {book.volumeInfo.authors
                        ? book?.volumeInfo?.authors
                        : "Unknown"}
                    </Text>
                  </div>
                  <div>
                    <Text c="green">
                      <span style={{ color: "black" }}>Price: </span>
                      {book.saleInfo.listPrice
                        ? book.saleInfo.listPrice.amount + "₺"
                        : "Not for sale"}
                    </Text>
                  </div>
                  <div style={{ marginTop: 40 }}>
                    <Button
                      radius="l"
                      size="xs"
                      variant="outline"
                      color={darkModeAppshel ? null : "black"}
                      onClick={() => removeOneFromCard(book.id)}
                      style={{ transition: "all 0.3s linear" }}
                    >
                      <IconShoppingCartX size={20} />
                    </Button>
                    <Button
                      radius="l"
                      color={darkModeAppshel ? null : "black"}
                      size="xs"
                      variant="outline"
                      style={{
                        marginLeft: 5,
                        marginRight: 5,
                        transition: "all 0.3s linear",
                      }}
                      onClick={() => addOneMoreToCart(book.id)}
                    >
                      <IconShoppingCartPlus size={20} />
                    </Button>
                    {book?.quantity > 1 ? (
                      <Button
                        radius="l"
                        size="xs"
                        variant="outline"
                        color={darkModeAppshel ? null : "black"}
                        onClick={() => removeItemFromCart(book.id)}
                        style={{ transition: "all 0.3s linear" }}
                      >
                        Remove All
                      </Button>
                    ) : null}
                  </div>
                  {book?.quantity > 1 ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 20,
                        maxWidth: 200,
                        marginBottom: 10,
                      }}
                    >
                      <Badge
                        color={darkModeAppshel ? null : "black"}
                        style={{ transition: "all 0.3s linear" }}
                      >
                        Count: {book?.quantity}
                      </Badge>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: 20,
                        maxWidth: 100,
                        marginBottom: 10,
                      }}
                    >
                      <Badge
                        color={darkModeAppshel ? null : "black"}
                        style={{ transition: "all 0.3s linear" }}
                      >
                        Count: {book?.quantity}
                      </Badge>
                    </div>
                  )}
                </div>
              </Group>
            </Grid>
            <div className="ellipsis-shopping-card-description">
              <Text c="dimmed">{book.volumeInfo.description}</Text>
            </div>
          </Card>
        ))}
      </div>
      <div
        style={{
          height: 500,
          padding: "20px",
          display: "flex",
        }}
      >
        <Card
          shadow="xl"
          padding="lg"
          radius="md"
          mb="md"
          withBorder
          style={{ height: 250, width: 350 }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "100vh",
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -15,
                right: "48%",
                transform: "translateX(50%)",
              }}
            >
              {localStorage.getItem("cartItems") ? (
                <Button color="red" onClick={clearBasket}>
                  Clear Basket
                </Button>
              ) : null}
            </div>
            <h1>Shopping Basket</h1>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              height: "100vh",
              width: "100%",
            }}
          >
            <Text>Total amount: {formattedAmount}</Text>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
            }}
          >
            {cartItems.length === 0 ? (
              <Text>No items in the cart</Text>
            ) : (
              <Text>Items in the cart: {totalCount}</Text>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              height: "100vh",
              width: "100%",
            }}
          >
            <Modal
              opened={opened}
              onClose={close}
              centered
              title="Sales Information"
              transition="fade"
              style={{ fontSize: 20 }}
            >
              <form ref={formRef} onSubmit={form.onSubmit(handleFormSubmit)}>
                <TextInput
                  label="Name"
                  placeholder="Name"
                  withAsterisk
                  key={form.key("name")}
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Your adress"
                  placeholder="Your adress"
                  withAsterisk
                  mt="md"
                  key={form.key("adress")}
                  {...form.getInputProps("adress")}
                />
                <TextInput
                  label="Your email"
                  placeholder="Your email"
                  withAsterisk
                  mt="md"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                />

                <NumberInput
                  label="Your age"
                  placeholder="Your age"
                  withAsterisk
                  mt="md"
                  key={form.key("age")}
                  {...form.getInputProps("age")}
                />

                <Group justify="flex-end" mt="md">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: 700 }}>{formattedAmount}</span>
                    <Button type="submit" onClick={notifyBuy}>
                      Submit
                    </Button>
                  </div>
                </Group>
              </form>
            </Modal>
            <Button
              size="md"
              color={darkModeAppshel ? null : "black"}
              style={{
                marginLeft: 20,
                width: "100%",
                transition: "all 0.3s linear",
              }}
              onClick={open}
            >
              Buy
            </Button>
          </div>
        </Card>
      </div>
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100%",
      }}
    >
      <Card
        shadow="xl"
        padding="lg"
        radius="md"
        mb="md"
        withBorder
        style={{ height: 250, width: 350 }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -15,
              right: "50%",
              transform: "translateX(50%)",
            }}
          >
            {localStorage.getItem("cartItems") ? (
              <Button color="red" onClick={clearBasket}>
                Clear Basket
              </Button>
            ) : null}
          </div>
          <h1>Shopping Basket</h1>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "100vh",
            width: "100%",
          }}
        >
          <Text fw={700}>Total amount: {formattedAmount}</Text>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          {cartItems.length === 0 ? (
            <Text fw={300}>No items in the cart</Text>
          ) : (
            <Text>Items in the cart: {totalCount}</Text>
          )}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <Button
            size="md"
            color={darkModeAppshel ? null : "black"}
            style={{
              marginLeft: 20,
              width: "100%",
              transition: "all 0.3s linear",
            }}
            disabled
          >
            Buy
          </Button>
        </div>
      </Card>
    </div>
  );
}
export default ShoppingCardDetail;
