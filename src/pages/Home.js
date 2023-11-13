import React, { useState } from "react";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import NovelModal from "../components/NovelModal";
import Girl1 from "../images/여자1.png";
import Girl2 from "../images/여자2.png";
import Girl3 from "../images/여자3.png";
import Couple1 from "../images/커플1.png";
import Couple2 from "../images/커플2.png";
import Couple3 from "../images/커플3.png";
import Prince1 from "../images/왕자2.png";
import Prince2 from "../images/왕자3.png";
import Soccer1 from "../images/축구하는남자.png";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Dream Shaper
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const cards = [
  {
    id: 1,
    title: "소설1",
    backgroundImage: `url(${Girl1})`,
  },
  {
    id: 2,
    title: "소설2",
    backgroundImage: `url(${Girl2})`,
  },
  {
    id: 3,
    title: "소설3",
    backgroundImage: `url(${Girl3})`,
  },
  {
    id: 4,
    title: "소설4",
    backgroundImage: `url(${Couple1})`,
  },
  {
    id: 5,
    title: "소설5",
    backgroundImage: `url(${Couple2})`,
  },
  {
    id: 6,
    title: "소설6",
    backgroundImage: `url(${Couple3})`,
  },
  {
    id: 7,
    title: "소설7",
    backgroundImage: `url(${Prince1})`,
  },
  {
    id: 8,
    title: "소설8",
    backgroundImage: `url(${Prince2})`,
  },
  {
    id: 9,
    title: "소설9",
    backgroundImage: `url(${Soccer1})`,
  },
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMusic, setCurrentMusic] = useState(null);

  const openModal = (music) => {
    setCurrentMusic(music);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setCurrentMusic(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
          }}
        >
          <Container maxWidth="lg"></Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Typography gutterBottom variant="h4" component="h2">
            소설 목록
          </Typography>
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "100%",
                      backgroundImage: card.backgroundImage,
                      backgroundSize: "auto 100%",
                      backgroundPosition: "center",
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}
                    >
                      {card.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {card.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => openModal(card)}>
                      소설 보기
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        {/* 모달 컴포넌트 */}
        <NovelModal open={isModalOpen} handleClose={closeModal} novel={currentMusic} />
      </main>
    </>
  );
}
