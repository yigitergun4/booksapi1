import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Button, Badge } from "@mantine/core";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import "../App.css";
import { IconBook } from "@tabler/icons";
import { useState, useEffect } from "react";

function TogglePopUp({ book }) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const ItemCount =
    cartItems.find((item) => item.id === book.id)?.quantity || 0;
  const styleBookDetailButton = {
    backgroundColor: JSON.parse(localStorage.getItem("darkMode"))
      ? null
      : "#526D82",
    transition: "all 0.3s linear",
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 300 }}
        size="50%"
      >
        {
          <div className="mediaCardToggle">
            <Card key={book.id}>
              {book?.volumeInfo?.imageLinks?.smallThumbnail ? (
                <>
                  <CardMedia
                    component="img"
                    sx={{ height: 200 }}
                    image={book?.volumeInfo?.imageLinks?.smallThumbnail}
                    src="s"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </>
              ) : (
                <div className="imageBookDiv">
                  <IconBook height={300} width={300} />
                </div>
              )}
              <CardActions>
                <div>
                  <Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "600px",
                        padding: 10,
                        fontWeight: "bolder",
                      }}
                    >
                      {book?.volumeInfo?.authors?.[0]}
                      {ItemCount > 0 ? (
                        <Badge
                          color={
                            JSON.parse(localStorage.getItem("darkMode"))
                              ? null
                              : "#526D82"
                          }
                        >{`Count: ${ItemCount}`}</Badge>
                      ) : null}
                      <div>
                        <a
                          className="divAmount"
                          href={book?.saleInfo?.buyLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {book?.saleInfo?.listPrice?.amount ? (
                            <div>{`${book?.saleInfo?.listPrice?.amount}₺`}</div>
                          ) : (
                            <>
                              {book?.saleInfo?.saleability ===
                                "NOT_FOR_SALE" && (
                                <Badge
                                  variant={
                                    JSON.parse(localStorage.getItem("darkMode"))
                                      ? "gradient"
                                      : "filled"
                                  }
                                  color={
                                    JSON.parse(localStorage.getItem("darkMode"))
                                      ? null
                                      : "#DDE6ED"
                                  }
                                  gradient={{
                                    from: "orange",
                                    to: "red",
                                    deg: 90,
                                  }}
                                  radius="md"
                                  style={{ padding: 12 }}
                                >
                                  Stokta yok
                                </Badge>
                              )}
                              {book?.saleInfo?.saleability === "FREE" && (
                                <Badge
                                  variant={
                                    JSON.parse(localStorage.getItem("darkMode"))
                                      ? "gradient"
                                      : "filled"
                                  }
                                  gradient={{
                                    from: "orange",
                                    to: "red",
                                    deg: 90,
                                  }}
                                  color={
                                    JSON.parse(localStorage.getItem("darkMode"))
                                      ? null
                                      : "#526D82"
                                  }
                                  radius="md"
                                  style={{ padding: 12 }}
                                >
                                  Click for read
                                </Badge>
                              )}
                            </>
                          )}
                        </a>
                      </div>
                    </div>
                  </Typography>
                </div>
              </CardActions>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="amountAuthors"
                >
                  <div>{book?.volumeInfo?.title}</div>
                  <div
                    style={{
                      fontSize: 20,
                    }}
                  >
                    {book?.volumeInfo?.categories}
                  </div>
                </Typography>

                <div className="authorsAndDescDiv">
                  <Typography variant="body2" color="text.secondary">
                    {book?.volumeInfo?.description}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          </div>
        }
      </Modal>
      <Button
        onClick={open}
        variant="filled"
        className="buttonCardDetail"
        style={styleBookDetailButton}
      >
        Book Detail
      </Button>
    </>
  );
}
export default TogglePopUp;
