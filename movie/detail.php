<?php include "header.php" ?>
<script type="module" src="./js/detail.js"></script>
<figure class="slide">

</figure>
<main class="detail-content">
  <section class="detail-section">
    <img src="" alt="" class="poster">
    <div class="detail-info">
      <h2 class="title"></h2>
      <ul class="meta">
        <li>
          <div class="vote-average">
            <svg viewbox="0 0 100 100">
              <circle  cx="50" cy="50" r="47" class="stroke"/>
              <circle pathLength="10" cx="50" cy="50" r="47" class="progress"/>
            </svg>
            <b class="average"></b>
            <img class="logo-small" src="./img/logo-square.png" alt="">
          </div>
          <small class="vote-cnt"></small>
        </li>
        <li>
          <i class="fa-solid fa-clock-rotate-left"></i>
          <em class="hour"></em>
          <small>Hour</small>
          <em class="min"></em>
          <small>Min</small>
        </li>
        <li>
          <i class="fa-regular fa-calendar-check"></i>
          <small class="date"></small>
        </li>
        <li class="genres">
        <i class="fa-solid fa-tags"></i>
        <small class="genre"></small>
        </li>
      </ul>
      <p class="overview"></p>
      <ul class="info">
        <li>
        <i class="fa-solid fa-clapperboard"></i>
          <small>제목</small>
          <em class="original-title"></em>
        </li>
        <li>
        <i class="fa-solid fa-building"></i>
          <small>제작사</small>
          <em class="production"></em>
        </li>
        <li>
        <i class="fa-solid fa-user-tie"></i>
          <small>제작자</small>
          <em class="producer"></em>
        </li>
        <li>
        <i class="fa-solid fa-user-gear"></i>
          <small>감독</small>
          <em class="director"></em>
        </li>
      </ul>
    </div>
  </section>

  <section class="common-section scroll-section people-section">
    <h2>
      <i class="fa-solid fa-users"></i>
      <em>출연진</em>
    </h2>
    <div class="grid-container"></div>
  </section>

  <section class="common-section scroll-section img-section">
    <h2>
      <i class="fa-solid fa-image"></i>
      <em>관련 이미지</em>
    </h2>
    <div class="grid-container"></div>
  </section>

  <section class="common-section scroll-section video-section">
  <h2>
  <i class="fa-solid fa-video"></i>
  <em>관련 영상</em>
  </h2>
  <div class="grid-container"></div>
  </section>

  <section class="common-section movie-grid-section wrap-section similar-section">
    <h2>
      <i class="fa-solid fa-photo-film"></i>
      <em>유사한 영화</em>
    </h2>
    <div class="grid-container"><!-- 동적 추가 -->
    </div>
  </section>

</main>

<?php include "video-modal.php" ?>
<?php include "person-modal.php" ?>
<?php include "footer.php" ?>