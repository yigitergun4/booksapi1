import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import appcss from "../App.css";
import classescss from "../templates/classes.css";
import TogglePopUp from "./TogglePopUp";
import Tooltip from "@mui/material/Tooltip";
import { Badge, Button } from "@mantine/core";
import {
  IconBook,
  IconShoppingCartPlus,
  IconShoppingCartX,
} from "@tabler/icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MediaCard({ book, darkMode, setBookCounts }) {
  useEffect(() => {
    const updateCartCount = () => {
      const items = JSON.parse(localStorage.getItem("cartItems")) || [];
      const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
      setBookCounts(totalCount);
    };

    window.addEventListener("storage", updateCartCount);

    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, [setBookCounts]);
  const notifyError = () =>
    toast.error("Selected book removed from basket", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      progress: undefined,
    });

  const updateCartCount = () => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    setBookCounts(totalCount);
  };
  const notifyNotInBasket = () =>
    toast.error("Selected book is not in the basket", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      progress: undefined,
    });

  useEffect(() => {
    window.addEventListener("storage", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
    };
  }, []);

  const itemMinus = () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.id === book.id);
    if (existingItem && existingItem.quantity >= 1) {
      existingItem.quantity -= 1;
    } else if (existingItem && existingItem.quantity === 0) {
      cartItems = cartItems.filter((item) => item.id !== book.id);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartCount();
    if (cartItems.find((item) => item.id === book.id)) {
      notifyError();
    } else {
      return;
    }
  };

  const addtoLocalStorage = () => {
    let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItem = cartItems.find((item) => item.id === book.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const newItem = { ...book, quantity: 1 };
      cartItems.push(newItem);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    updateCartCount();
    toast.success("Selected book added to the basket", {
      position: "bottom-right",
      autoClose: 2000,
      closeOnClick: true,
      progress: undefined,
    });
  };
  return (
    <div className="mediaCard">
      <Card key={book.id} variant="outlined">
        {book?.saleInfo?.buyLink ? (
          <>
            <div
              style={{
                position: "absolute",
              }}
            >
              {book?.saleInfo?.saleability === "FOR_SALE" && (
                <Button
                  radius="l"
                  size="xs"
                  onClick={itemMinus}
                  style={{
                    left: 5,
                    top: 5,
                    backgroundColor: darkMode ? null : "rgb(43, 12, 30)",
                    transition: "all 0.3s linear",
                  }}
                >
                  <IconShoppingCartX size={20} />
                </Button>
              )}
            </div>

            {book?.saleInfo?.saleability === "FOR_SALE" && (
              <Button
                radius="l"
                size="xs"
                onClick={addtoLocalStorage}
                style={{
                  position: "absolute",
                  right: 5,
                  top: 5,
                  backgroundColor: darkMode ? null : "rgb(43, 12, 30)",
                  transition: "all 0.3s linear",
                }}
              >
                <IconShoppingCartPlus size={20} />
              </Button>
            )}
            {book?.saleInfo?.saleability === "FREE" && (
              <Button
                radius="l"
                size="xs"
                style={{
                  position: "absolute",
                  right: 5,
                  top: 5,
                  backgroundColor: darkMode ? null : "rgb(43, 12, 30)",
                  transition: "all 0.3s linear",
                }}
              >
                <a
                  href={book?.saleInfo?.buyLink}
                  target="blank_"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  Free
                </a>
              </Button>
            )}
          </>
        ) : null}
        {book?.volumeInfo?.imageLinks?.smallThumbnail ? (
          <CardMedia
            component="img"
            sx={{ height: 200 }}
            image={book?.volumeInfo?.imageLinks?.smallThumbnail}
            src="s"
            style={{
              objectFit: "contain",
            }}
          />
        ) : (
          <div className="imageBookDiv">
            <IconBook height={200} width={200} />
          </div>
        )}
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="ellipsisTitle"
          >
            {book?.volumeInfo?.title?.length > 20 ? (
              <Tooltip title={book?.volumeInfo?.title}>
                <div>{book?.volumeInfo?.title}</div>
              </Tooltip>
            ) : (
              <div>{book?.volumeInfo?.title}</div>
            )}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            className="ellipsis"
            sx={{ height: 60 }}
          >
            {book?.volumeInfo?.description}
          </Typography>
        </CardContent>
        <CardActions>
          <div className="cardDetail">
            <TogglePopUp book={book} darkMode={darkMode}></TogglePopUp>
            <div className="divAmount" style={{ fontWeight: "bold" }}>
              {book?.saleInfo?.listPrice?.amount
                ? book?.saleInfo?.listPrice?.amount + "₺"
                : (book?.saleInfo?.saleability === "NOT_FOR_SALE" && (
                    <Badge
                      variant={darkMode ? "gradient" : null}
                      gradient={{ from: "orange", to: "red", deg: 90 }}
                      radius="lg"
                      color={darkMode ? null : "rgba(18, 7, 30, 0.2)"}
                    >
                      Stokta yok
                    </Badge>
                  )) ||
                  (book?.saleInfo?.saleability === "FREE" && (
                    <Badge
                      variant={darkMode ? "gradient" : null}
                      gradient={{ from: "lime", to: "green", deg: 90 }}
                      radius="lg"
                      color={darkMode ? null : "rgb(43, 12, 30)"}
                    >
                      Free
                    </Badge>
                  ))}
            </div>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}
