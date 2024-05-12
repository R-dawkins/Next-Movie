<?php include "header.php" ?>
<script src="./js/home.js" type="module"></script>
<section class="home-visual">
  <div class="swiper-wrapper">
<!--     <figure class="swiper-slide">
      <img src="" alt="">
      <figcaption>figcaption안에서 a태그를 쓸 수 없다 (앵커가 figcaption의 자식이 될 수 없음)
        <small class="original-title">영화 원제목</small>
        <h6 class="title">한글 영화 제목 :qp부제가 있을수도 있음</h6>
        <p class="overview">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus quisquam officiis inventore vitae totam atque, saepe temporibus, officia reiciendis repellendus deleniti, aliquam provident accusantium! Voluptatem assumenda labore fugiat quis ducimus.</p>
        <button class="play-btn"><i class="fa-brands fa-google-play"></i>재생</button>
        <button class="detail-btn"><i class="fa-solid fa-circle-info"></i>상세정보</button>
      </figcaption>
    </figure>
    <figure class="swiper-slide">2</figure>
    <figure class="swiper-slide">3</figure>
    <figure class="swiper-slide">4</figure>
    <figure class="swiper-slide">5</figure> -->
  </div>
  <button class="prev"></button>
  <button class="next"></button>
  <button class="wheel-btn">
  <i class="fa-solid fa-arrow-down"></i>
  </button>
</section>

<main class="home-content">
  <section class="common-section movie-grid-section swiper-section popular-section">
    <h2>
      <i class="fa-solid fa-clapperboard"></i>
      <em>현재 인기 영화</em>
    </h2>
    <div class="carousel grid-container">
      <div class="swiper-wrapper">
        <!--<figure>
          <a href="./detail.php?id={아이디번호}">
          <div class="imgbox">
            <img src="./img/no-image.jpg" alt="">
            <span></span>
            <small>7.2</small>
          </div>
          <figcaption>
            <h3>{영화제목}</h3>
            <p>{액션 / 코메디 / 장르 /}</p>
            <p>{2023-8-6}</p>
          </figcaption>
          </a>
        </figure> -->
      </div>
      <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </section>
  <section class="common-section movie-grid-section swiper-section upcoming-section">
    <h2>
      <i class="fa-solid fa-calendar-days"></i>
      <em>최신 개봉 영화</em>
    </h2>
    <div class="carousel grid-container">
      <div class="swiper-wrapper">
      </div>
      <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
    
  </section>
  <section class="common-section movie-grid-section swiper-section rated-section">
    <h2>
      <i class="fa-solid fa-square-poll-vertical"></i>
      <em>평점 상위 영화</em>
    </h2>
    <div class="carousel grid-container">
      <div class="swiper-wrapper">
      </div>
      <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </section>
  <section class="common-section movie-grid-section swiper-section trend-section">
    <h2>
      <i class="fa-solid fa-comments"></i>
      <em>주간 화제작</em>
    </h2>
    <div class="carousel grid-container">
      <div class="swiper-wrapper">
      </div>
      <button class="prev"><i class="fa-solid fa-arrow-left"></i></button>
      <button class="next"><i class="fa-solid fa-arrow-right"></i></button>
    </div>
  </section>
    
</main>
<!-- 
-->

<?php include "video-modal.php" ?>
<?php include "footer.php" ?>