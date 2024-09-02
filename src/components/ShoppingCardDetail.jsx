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
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState, useEffect } from "react";
import {
  IconShoppingCartX,
  IconShoppingCartPlus,
  IconTrash,
} from "@tabler/icons";
import "../App.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDisclosure } from "@mantine/hooks";
function ShoppingCardDetail() {
  const [cartItems, setCartItems] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);
  const [formattedAmount, setFormattedAmount] = useState("");
  const [darkMode, setdarkMode] = useState(
    JSON.parse(localStorage.getItem("darkMode")) || true
  );
  useEffect(() => {
    const storedDarkMode = JSON.parse(localStorage.getItem("darkMode"));
    setdarkMode(storedDarkMode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.parse(localStorage.getItem("darkMode"))]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
  }, []);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      adress: "",
      email: "",
      age: 18,
      termsOfService: false,
    },
    validate: {
      email: (value) =>
        value.includes("@gmail.com") ? null : "Please enter a valid email",
      name: (value) => (value.length > 4 ? null : "Name is too short"),
      adress: (value) => (value.length > 12 ? null : "Adress is too short"),
      age: (value) =>
        value >= 18 ? null : "You should be at least 18 years old",
    },
  });
  const notifyError = () =>
    toast.error("Selected book removed from basket", {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      progress: undefined,
    });
  const notifyErrorAll = () => {
    toast.error("All books removed from basket", {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      progress: undefined,
    });
  };
  const notifyAllSelectedBooksRemoved = () => {
    toast.error("All selected books removed from basket", {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      progress: undefined,
    });
  };

  const notifySuccess = () =>
    toast.success("Selected book added to the basket", {
      position: "bottom-right",
      autoClose: 1000,
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
    form.validate();
    const values = form.getValues();
    let hasError = false;

    if (values.name.length <= 4) {
      hasError = true;
    }
    if (values.adress.length <= 4) {
      hasError = true;
    }
    if (values.email.length <= 4 || !values.email.includes("@gmail.com")) {
      hasError = true;
    }
    if (values.age < 18) {
      hasError = true;
    }
    if (hasError) {
      toast.error("Please fill all fields correctly", {
        position: "bottom-right",
        autoClose: 1000,
        closeOnClick: true,
        progress: undefined,
      });
    } else {
      notifyBuy();
      form.reset();
      localStorage.removeItem("cartItems");
      setFormattedAmount(0);
      setTotalCount(0);
    }
  };
  const removeItemFromCart = (bookId) => {
    const updatedItems = cartItems.filter((book) => {
      return book.id !== bookId;
    });
    setCartItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    notifyAllSelectedBooksRemoved();
  };
  const notifyBuy = () => {
    toast.success("Your order has been received", {
      position: "bottom-right",
      autoClose: 1000,
      closeOnClick: true,
      progress: undefined,
    });
    form.reset();
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
    return (
      acc + (book?.saleInfo?.listPrice?.amount || 0) * (book.quantity || 0)
    );
  }, 0);
  const clearBasket = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
    notifyErrorAll();
  };
  const styleDiv = {
    backgroundColor: darkMode ? null : "#27374D",
    minHeight: "100vh",
  };
  const styleCard = {
    width: `100%`,
    backgroundColor: darkMode ? null : "#DDE6ED",
    transition: "all 0.3s linear",
  };
  const styleCardCol = { marginLeft: 20, marginTop: 20, marginRight: 20 };
  const styleButton = {
    color: darkMode ? null : "#27374D",
    transition: "all 0.3s linear",
  };
  const styleButton2 = {
    transition: "all 0.3s linear",
    marginLeft: 5,
  };
  const styleBadges = {
    transition: "all 0.3s linear",
  };
  const NoItemsInCartDiv = {
    backgroundColor: darkMode ? null : "#27374D",
  };
  useEffect(() => {
    const totalCount = cartItems.reduce((acc, book) => {
      return acc + book.quantity;
    }, 0);
    setTotalCount(totalCount);
  }, [cartItems]);
  useEffect(() => {
    const formatted = new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
    setFormattedAmount(formatted);
  }, [amount]);
  return JSON.parse(localStorage.getItem("cartItems")) ? (
    <div style={styleDiv}>
      <Flex direction={{ base: "column", lg: "row" }}>
        <div className="shoppingCardDetailDiv">
          {cartItems.map((book) => (
            <Card
              key={book.id}
              shadow="xl"
              padding="lg"
              radius="md"
              mb="md"
              withBorder
              style={styleCard}
            >
              <Grid justify="flex-start" align="flex-start">
                <Grid.Col span={{ base: 1, md: 2, lg: 2 }} style={styleCardCol}>
                  <Card.Section mb="sm">
                    <Image src={book?.volumeInfo?.imageLinks?.thumbnail} />
                  </Card.Section>
                </Grid.Col>
                <Group mb="xs">
                  <div>
                    <div>
                      <Text fw={700}>{book?.volumeInfo?.title}</Text>
                    </div>
                    <div>
                      <Text>
                        Author:{" "}
                        {book?.volumeInfo?.authors
                          ? book?.volumeInfo?.authors
                          : "Unknown"}
                      </Text>
                    </div>
                    <div>
                      <Text c="green">
                        <span className="shoppingCardDetailSpan">Price: </span>
                        {book?.saleInfo?.listPrice
                          ? book?.saleInfo?.listPrice?.amount + "₺"
                          : "Not for sale"}
                      </Text>
                    </div>
                    <div style={{ marginTop: 40 }}>
                      <Button
                        radius="l"
                        size="xs"
                        variant="outline"
                        onClick={() => removeOneFromCard(book.id)}
                        style={styleButton}
                        color={darkMode ? null : "#27374D"}
                      >
                        <IconShoppingCartX size={20} />
                      </Button>
                      <Button
                        radius="l"
                        size="xs"
                        variant="outline"
                        color={darkMode ? null : "#27374D"}
                        style={styleButton2}
                        onClick={() => addOneMoreToCart(book.id)}
                      >
                        <IconShoppingCartPlus size={20} />
                      </Button>
                      {book?.quantity > 1 ? (
                        <Button
                          radius="l"
                          size="xs"
                          variant="outline"
                          onClick={() => removeItemFromCart(book.id)}
                          style={styleButton2}
                          color={darkMode ? null : "#27374D"}
                        >
                          Remove All
                        </Button>
                      ) : null}
                    </div>
                    {book?.quantity > 1 ? (
                      <div className="shoppingCardDetailBadges2">
                        <Badge
                          style={styleBadges}
                          color={darkMode ? null : "#27374D"}
                        >
                          Count: {book?.quantity}
                        </Badge>
                      </div>
                    ) : (
                      <div className="shoppingCardDetailBadges">
                        <Badge
                          style={styleBadges}
                          color={darkMode ? null : "#27374D"}
                        >
                          Count: {book?.quantity}
                        </Badge>
                      </div>
                    )}
                  </div>
                </Group>
              </Grid>
            </Card>
          ))}
        </div>
        <div className="shoppingCardDetailCardDiv">
          <Card
            shadow="xl"
            padding="lg"
            radius="md"
            mb="md"
            withBorder
            className="shoppingCardDetailCard"
          >
            <div>
              <div className="shoppingCardDetailCardDiv3">
                {localStorage.getItem("cartItems") ? (
                  <Button color="red" onClick={clearBasket}>
                    <IconTrash />
                    <span>Clear Basket</span>
                  </Button>
                ) : null}
              </div>
              <div className="shoppingCardDetailCardDiv3">
                <h1>Shopping Basket</h1>
              </div>
            </div>
            <div className="shoppingCardDetailCardDiv4">
              <Text>Total amount: {formattedAmount}</Text>
            </div>
            <div className="shoppingCardDetailCardDiv4">
              {cartItems.length === 0 ? (
                <Text>No items in the cart</Text>
              ) : (
                <Text>Items in the cart: {totalCount}</Text>
              )}
            </div>
            <div className="shoppingCardDetailCardDiv4">
              <Modal
                opened={opened}
                onClose={close}
                centered
                title="Sales Information"
                transition="fade"
              >
                <form onSubmit={handleFormSubmit}>
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
                    placeholder="your@gmail.com"
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
                    <div className="shoppingCardDetailModalDiv">
                      <span style={{ fontWeight: 700 }}>{formattedAmount}</span>
                      <Button type="submit" color={darkMode ? null : "#27374D"}>
                        Submit
                      </Button>
                    </div>
                  </Group>
                </form>
              </Modal>
              <Button
                size="md"
                color={darkMode ? null : "#526D82"}
                className="shoppingCardDetailBuyButton"
                onClick={open}
              >
                Buy
              </Button>
            </div>
          </Card>
        </div>
      </Flex>
    </div>
  ) : (
    <div className="NoItemsInCartDiv" style={NoItemsInCartDiv}>
      <Card
        shadow="xl"
        padding="lg"
        radius="md"
        mb="md"
        withBorder
        style={{ height: 250 }}
      >
        <div>
          <div>
            {localStorage.getItem("cartItems") ? (
              <Button color="red" onClick={clearBasket}>
                Clear Basket
              </Button>
            ) : null}
          </div>
          <h1>Shopping Basket</h1>
        </div>

        <div className="NoItemsInCartDiv">
          <Text fw={700}>Total amount: {formattedAmount}</Text>

          {cartItems.length === 0 ? (
            <Text fw={300}>No items in the cart</Text>
          ) : (
            <Text>Items in the cart: {totalCount}</Text>
          )}
        </div>
      </Card>
    </div>
  );
}
export default ShoppingCardDetail;
