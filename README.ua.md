<p align="center">
  <a href="https://github.com/SilentImp/html/blob/master/README.md">English</a> |
  Українська |
  <a href="https://github.com/SilentImp/html/blob/master/README.ru.md">Pусский</a>
</p>

# HTML рекомендації та найкращі практики

## Надавайте перевагу меншій кількості елементів перед більшою

Великі блоки HTML складніше читати, розуміти та підтримувати. Окрім цього, великий DOM може погано впливати на продуктивність.

- [Avoid an excessive DOM size](https://web.dev/dom-size/)

### Уникайте

```html
<div class="outer-margin">
  <div class="inner-padding">
    <p>Ані муки, ні кайдани — Дух зломить не зможуть твій.</p>
  </div>
</div>
```

### Надавайте перевагу

```html
<div class="description">
  <p>Ані муки, ні кайдани — Дух зломить не зможуть твій.</p>
</div>
```

## Надавайте перевагу елементам, що мають відповідне семантичне значення перед елементами загального призначення 

Семантично правильний HTML легче читати, розуміти та підтримувати. Це краще з точки зору доступності, нариклад для программ читання з екрану. Не кажучи вже про роботів та всіляких парсерів, включаючи пошукових ботів.

- [The practical value of semantic HTML](https://www.brucelawson.co.uk/2018/the-practical-value-of-semantic-html/)
- [HTML: A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
- [Understanding why Semantic HTML is important, as told by TypeScript.](https://medium.com/@mandy.michael/understanding-why-semantic-html-is-important-as-told-by-typescript-bd71ad41e6c4)
- [The SEO Advantages of Machine-Readable HTML5 Semantic Markup](https://searchengineland.com/seo-advantages-of-machine-readable-html5-semantic-markup-314455)
- [Semantics in HTML 5](https://alistapart.com/article/semanticsinhtml5/)

### Уникайте
```html
<span>20 хвилин тому.</span>
```

### Надавайте перевагу
```html
<time datetime="2020-09-01T20:00:00">20 хвилин тому.</time>
```

## Надавайте перевагу прогресивному покращенню і спрощенню перед складними та костурбатими рішеннями

Таким чином ми матимемо надійне рішення, в той самий час, як користувач отримає максимум, який дозволяє його платформа, від програмного продукту.

- [Progressive Enhancement: What It Is, And How To Use It?](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)
- [Do websites need to look exactly the same in every browser?](http://dowebsitesneedtolookexactlythesameineverybrowser.com/)

### Уникайте
```html
<p data-lines="3" class="abstract">Коли замовкли стріли пістолів і одспівали весілля, а жінка пригнала до загороди вівці й корови, Іван був задоволений навіть. Його Палагна була з багацького роду, фудульна, здорова дівка, з грубим носом й воластою шиєю. Правда, вона любила пишне лудіння, і немало десь піде грошей на шовкові хустки та дорогі згарди, але то байка! Поглядаючи на овечки, що блеяли в загородах, на свій писаний ботей (стадо), на корови, що дзвонили та рули по випасах в лісі,— він не журився.</p>
<style>
  .abstract {
    width: 20rem;
    font-size: 0.75rem;
    line-height: 1rem;
  }
</style>
<script>
  const truncateElement = document.querySelector('.abstract');
  const truncateText=truncateElement.textContent;
  const lines = parseInt(truncateElement.dataset.lines);
  const getLineHeight = function(element) {
    const lineHeight = window.getComputedStyle(truncateElement)['line-height'];
    if (lineHeight === 'normal') {
      return 1.16 * parseFloat(window.getComputedStyle(truncateElement)['font-size']);
    } else {
      return parseFloat(lineHeight);
    }
  }
  truncateElement.innerHTML= truncateText;
  const truncateTextParts= truncateText.split(' ');
  const lineHeight = getLineHeight(truncateElement);
  
  while(lines * lineHeight < truncateElement.clientHeight) {
    truncateTextParts.pop();
    truncateElement.innerHTML = truncateTextParts.join(' ') + '…';
  }
</script>
```

### Надавайте перевагу
```html
<p class="abstract">Коли замовкли стріли пістолів і одспівали весілля, а жінка пригнала до загороди вівці й корови, Іван був задоволений навіть. Його Палагна була з багацького роду, фудульна, здорова дівка, з грубим носом й воластою шиєю. Правда, вона любила пишне лудіння, і немало десь піде грошей на шовкові хустки та дорогі згарди, але то байка! Поглядаючи на овечки, що блеяли в загородах, на свій писаний ботей, на корови, що дзвонили та рули по випасах в лісі,— він не журився.</p>
<style>
  .abstract {
    width: 20rem;
    font-size: 0.75rem;
    line-height: 1rem;
    max-height: 3rem;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
```

## Надавайте перевагу нативному перед кастомним 

Майже неможливо зробити UX краще за той, що забеспечують розробники браузерів. Ми не маємо їх ресурсів: ні часу, ні людей. Неможливо знайти всі подводні камені, пов'язані з вирішенням конкретної проблеми. Не кажучи вже про те, що нативні едементи зазвичай мають значно кращу продуктивність.

1. Створення кастомного рішення потребує значно більше часу, ніж використання нативного.
2. Кастомне рішення неможливо так само глибоко інтегрувати із системою, як нативне. 
3. Ми не контролюємо зовнішні залежності. 
4. Зовнішні рішення часто густо погано впливають на розмір бандла.
5. Неможливо передбачити, де виникнуть проблеми в зовнішньому рішенні, чи воно доступне, що з локалізацією та інтернаціоналізацією.
6. Нативним елементам не потрібне завантаження JS-бандлів. Отже вони готові до використання одразу як завантажиться HTML.
7. Продуктивність нативних елементів зазвичай значно краща, ніж кастомних.
8. Нові можливості та виправлені помилки користувач отримує з оновленням браузеру.
9. Розробникам легше працювати з нативним рішенням, ніж з кастомним. Бо воно стандартизовано і широко відомо.

- [Do I need a custom select?](https://doineedacustomselect.com/)
- [Under the spotlight: Select](https://modulz.app/blog/under-the-spotlight-select)

### Уникайте
```html
<div class="details">
  <h2>Cокира</h2>
  <div class="details-content">
    Вони обоє знали, що то бродить по лісі невидима сокира, гупа об дерева і хека з втомлених грудей. Ляк проганяв їх звідти в долину, де потік плив спокійніше. Вони робили собі курбало у потоці, глибоке місце, і, роздягтись, бовтались в нім, як двоє лісних звірят, що не знають, що таке сором. Сонце спочивало на їх яснім волоссі і било в очі, а льодова вода потоку щипала тіло.
  </div>
</div>
<script>
  const toggler = (event) => {
    event.currentTarget.parentNode.classList.toggle("details-open");
  }
  document.querySelectorAll(".details").forEach((element) => {
    element.querySelector("h2").addEventListener("click", toggler);
  });
</script>
<style>
  .details h2 {
    all: unset;
  }
  .details h2::before {
    content: "►";
    margin-right: .5em;
    font-size: small;
    display: inline;
  }
  .details .details-content {
    display: none;
  }
  .details.details-open .details-content {
    display: block;
  }
  .details.details-open h2::before {
    content: "▼";
  }
</style>
```

### Надавайте перевагу
```html
<details>
  <summary>Cокира</summary>
  Вони обоє знали, що то бродить по лісі невидима сокира, гупа об дерева і хека з втомлених грудей. Ляк проганяв їх звідти в долину, де потік плив спокійніше. Вони робили собі курбало у потоці, глибоке місце, і, роздягтись, бовтались в нім, як двоє лісних звірят, що не знають, що таке сором. Сонце спочивало на їх яснім волоссі і било в очі, а льодова вода потоку щипала тіло.
</details>
```

## Надавайте перевагу валідному коду

Навіть як у вашому браузері все виглядає добре, у браузері користувача сторінка може виглядати зламаною, бо корекція помилок працює по-різному в різних браузерах. Окрім цього, це може збити з пантелику розробників, котрі будуть супроводжувати ваш код. Потенційно валідний HTML може бути корисним з точки зору пошукової оптимізації та доступності.

- [Why Validate?](https://validator.w3.org/docs/why.html)
- [6 Reasons Why Google Says Valid HTML Matters](https://www.searchenginejournal.com/google-valid-html/)

### Уникайте
```html
<dl>
  <h1>Словник</h1>

  <dt>Котюга</dt>
  <dd>Пес</dd>

  <dt>Дроб'єта</dt>
  <dd>Вівці і кози, дрібна худоба</dd>

  <dt>Помана</dt>
  <dd>Посмертний дарунок, спадщина худобою. Це від слів «поминати, згадувати»</dd>
</dl>
```

### Надавайте перевагу
```html
<h1>Словник</h1>

<dl>
  <dt>Котюга</dt>
  <dd>Пес</dd>

  <dt>Дроб'єта</dt>
  <dd>Вівці і кози, дрібна худоба</dd>

  <dt>Помана</dt>
  <dd>Посмертний дарунок, спадщина худобою. Це від слів «поминати, згадувати»</dd>
</dl>
```

## Надавайте перевагу презентації, відокремленій від структури

Легше підтримувати код, у якому структура та презентація відокремлені. Такий код легше розуміти та підтримувати. То краще для доступності. Добре з точки зору пошукової оптимізації.

- [Separation: The Web Designer’s Dilemma](https://alistapart.com/article/separationdilemma/)
- [Developing With Web Standards – Recommendations and best practices](https://www.456bereastreet.com/lab/developing_with_web_standards/structure/)
- [Separation of content and presentation](https://en.wikipedia.org/wiki/Separation_of_content_and_presentation)
- [G140: Separating information and structure from presentation to enable different presentations](https://www.w3.org/TR/WCAG20-TECHS/G140.html#:~:text=While%20presentational%20features%20visually%20imply,%2C%20paragraphs%2C%20lists%2C%20etc.&text=Providing%20separate%20structure%2C%20functionality%2C%20and,determined%20via%20the%20structure%20layer.)

### Уникайте
```html
<nav class="breadcrumbs">
  <ol>
    <li><a href="/home/">Головна</a></li>
    <li>&rarr;</li>
    <li><a href="/home/cluster/">Кластер</a></li>
    <li>&rarr;</li>
    <li>Сервіс</li>
  </ol>
</nav>

<style>
  .breadcrumbs ol{
    display: flex;
    list-style: none;
    align-items: center;
  }
  .breadcrumbs li{
    margin: 0 5px 0 0;
  }
</style>
```

### Надавайте перевагу
```html
<nav class="breadcrumbs">
  <ol>
    <li><a href="/home/">Головна</a></li>
    <li><a href="/home/cluster/">Кластер</a></li>
    <li>Сервіс</li>
  </ol>
</nav>

<style>
  .breadcrumbs ol{
    display: flex;
    list-style: none;
    align-items: center;
  }
  .breadcrumbs li:not(:last-child):after {
    content: "→";
    margin: 0 5px;
    pointer-events: none;
  }
</style>
```
