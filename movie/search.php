<?php include "header.php"?>
<script type="module" src="./js/search.js"></script>
<figure class="slide">

</figure>

<main class="search-content">
  <form class="search-form">
    <fieldset class="search-keyword">
      <span class="search-icon"><i class="fa-solid fa-magnifying-glass"></i></span>
      <input list="keyword-list" class="search-input" type="text" placeholder="영화제목을 입력하세요">
      <datalist id="keyword-list">
      </datalist>
      <button class="delete-btn" title="검색기록삭제" type="button">
      <i class="fa-solid fa-trash-can"></i>
      </button>
    </fieldset>
    <fieldset class="genre-btns"></fieldset>
  </form>

  <section class="common-section movie-grid-section wrap-section search-result-section">
    <h2>
      <i class="fa-solid fa-square-poll-vertical"></i>
      <em>검색 결과</em>
    </h2>
    <div class="grid-container"><!-- 검색결과동적생성 --></div>
  </section>
</main>
<div class="trigger"></div>
<!-- 무한스크롤 구현방법 면접에서 중요(스크롤하면 자동으로 데이터가 출력되는것) -->
<?php include "footer.php"?>