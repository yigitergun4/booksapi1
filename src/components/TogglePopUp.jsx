import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Modal, Button, Badge } from "@mantine/core";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import appcss from "../App.css";
import { IconBook } from "@tabler/icons";

function TogglePopUp({ book, darkMode }) {
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery("(max-width: 50em)");
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
                  <IconBook height={300} width={300} />
                </div>
              )}
              <CardActions>
                <div
                  className="cardDetail"
                  style={{
                    display: "flex",
                    marginRight: 20,
                    position: "relative",
                    alignItems: "center",
                  }}
                >
                  <Typography>
                    <div
                      className="divAmount"
                      style={{
                        position: "absolute",
                        left: 0,
                        top: "35%",
                        marginLeft: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {book?.volumeInfo?.authors?.[0]}
                    </div>
                  </Typography>

                  <div style={{ alignItems: "flex-end" }}>
                    <a
                      className="divAmount"
                      href={book?.saleInfo?.buyLink}
                      target="_blank"
                      style={{
                        textDecoration: "none",
                        color: "inherit",
                        fontWeight: "bold",
                      }}
                    >
                      {book?.saleInfo?.listPrice?.amount
                        ? book?.saleInfo?.listPrice?.amount + "₺"
                        : (book?.saleInfo?.saleability === "NOT_FOR_SALE" && (
                            <Badge
                              variant={darkMode ? "gradient" : null}
                              color={darkMode ? null : "rgb(43, 12, 30)"}
                              gradient={{ from: "orange", to: "red", deg: 45 }}
                              style={{ padding: 12 }}
                              radius="md"
                            >
                              Stokta yok
                            </Badge>
                          )) ||
                          (book?.saleInfo?.saleability === "FREE" && (
                            <Badge
                              variant={darkMode ? "gradient" : null}
                              gradient={{ from: "lime", to: "green", deg: 90 }}
                              color={darkMode ? null : "rgb(43, 12, 30)"}
                              radius="md"
                              style={{ padding: 12 }}
                            >
                              Read
                            </Badge>
                          ))}
                    </a>
                  </div>
                </div>
              </CardActions>
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>{book?.volumeInfo?.title}</div>
                  <div>{book?.volumeInfo?.categories}</div>
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
        style={{ backgroundColor: darkMode ? null : "rgb(43, 12, 30)" }}
      >
        Book Detail
      </Button>
    </>
  );
}
export default TogglePopUp;
