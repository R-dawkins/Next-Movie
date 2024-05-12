<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="shortcut icon" href="./img/favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700;800&family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&family=Nanum+Gothic:wght@400;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://unpkg.com/swiper@7/swiper-bundle.min.css" />
  <link rel="stylesheet" href="./css/viewbox.css">
  <link rel="stylesheet" href="./css/reset.css">
  <link rel="stylesheet" href="./css/main.css">
  <link rel="stylesheet" href="./css/header.css">
  <link rel="stylesheet" href="./css/./home/home-visual.css">
  <link rel="stylesheet" href="./css/./home/home.css">
  <link rel="stylesheet" href="./css/./common/modal.css">
  <link rel="stylesheet" href="./css/./common/common-layout.css">
  <link rel="stylesheet" href="./css/./common/slide.css">
  <link rel="stylesheet" href="./css/./footer/footer.css">
  <link rel="stylesheet" href="./css/./list/list.css">
  <link rel="stylesheet" href="./css/./search/search-form.css">
  <link rel="stylesheet" href="./css/./detail/detail-info.css">
  <link rel="stylesheet" href="./css/./detail/detail-section.css">
  <script src="https://kit.fontawesome.com/db0c711934.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/swiper@7/swiper-bundle.min.js"></script>
  <script src="http://code.jquery.com/jquery-latest.js"></script>
  <script src="./js/jquery.viewbox.min.js"></script>
  <script src="./js/common.js" type="module"></script>
  <title>tmdb</title>
  
</head>

<body>
  <header>
    <div class="center">
      <h1>
        <a href="./index.php">
          <span class="hidden">영화 정보 사이트</span><!-- html 룰을 지키려고 h1안에 글자를 넣음 -->
          <img src="./img/logo.png" alt="">
          <img src="./img/logo-text.png" alt="">
        </a>
      </h1>
      <nav class="gnb">
        <div class="menu-list">
          <button class="toggle-btn"><i class="fa-solid fa-bars"></i></button>
          <ul>
            <li><a href="./list.php?list=playing&page=1">현재상영작</a></li>
            <li><a href="./list.php?list=popular&page=1">인기영화</p></li>
            <li><a href="./list.php?list=upcoming&page=1">최신/개봉예정</a></li>
          </ul>
        </div>
      <a class="goto-search" href="./search.php"><i class="fa-solid fa-magnifying-glass-arrow-right"></i> 검색</a>
    </nav>
    </div>
  </header>
  <button class="top-btn">
  <i class="fa-solid fa-angles-up"></i>
  </button>