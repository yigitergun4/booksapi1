import * as React from "react";
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
import { IconBook } from "@tabler/icons";
import { dark } from "@mui/material/styles/createPalette";

export default function MediaCard({ book, darkMode }) {
  return (
    <div className="mediaCard">
      <Card key={book.id} variant="outlined">
        {book.saleInfo?.buyLink ? (
          <Button
            radius="l"
            size="xs"
            style={{
              position: "absolute",
              right: 5,
              top: 5,
              backgroundColor: darkMode ? null : "rgb(43, 12, 30)",
            }}
          >
            <a
              href={book.saleInfo.buyLink}
              target="_blank"
              style={{
                textDecoration: "none",
                color: darkMode ? "inherit" : "white",
              }}
            >
              {book?.saleInfo?.saleability === "FREE" ? "Read" : "Buy"}
            </a>
          </Button>
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
            {book?.volumeInfo?.title.length > 20 ? (
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
