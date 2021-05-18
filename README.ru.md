На других языках: [English](https://github.com/SilentImp/html/blob/master/README.md) | Pусский

# HTML рекомендации и наилучшие практики

## Предпочитайте меньшее количество элементов большему

Большие блоки HTML сложнее читать, понимать и поддерживать. Кроме того, большой DOM может негативно сказаться на производительности.

- [Avoid an excessive DOM size](https://web.dev/dom-size/)

### Нежелательно
```html
<div class="outer-margin">
  <div class="inner-padding">
    <p>Мы рабы на галерах.</p>
  </div>
</div>
```

### Предпочтительно
```html
<p class="description">Мы рабы на галерах.</p>
```

## Cемантически корректные элементы предпочтительнее элементов общего назначения

Семантически корректный HTML легче читать, понимать и поддерживать. Это лучше с точки зрения доступности, например для программ чтения с экрана. Не говоря уже о роботах и парсерах всевозможных мастей, включая поисковых ботов.

- [The practical value of semantic HTML](https://www.brucelawson.co.uk/2018/the-practical-value-of-semantic-html/)
- [HTML: A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
- [Understanding why Semantic HTML is important, as told by TypeScript.](https://medium.com/@mandy.michael/understanding-why-semantic-html-is-important-as-told-by-typescript-bd71ad41e6c4)
- [The SEO Advantages of Machine-Readable HTML5 Semantic Markup](https://searchengineland.com/seo-advantages-of-machine-readable-html5-semantic-markup-314455)
- [Semantics in HTML 5](https://alistapart.com/article/semanticsinhtml5/)

### Нежелательно
```html
<span>20 минут назад.</span>
```

### Предпочтительно
```html
<time datetime="2020-09-01T20:00:00">20 минут назад.</time>
```

## Прогрессивное улучшение и упрощение предпочтительнее, чем сложное или костыльное решение

Таким образом у нас будет максимально надежное решение, в то время как пользователь получит максимум от использования программного продукта.

- [Progressive Enhancement: What It Is, And How To Use It?](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)
- [Do websites need to look exactly the same in every browser?](http://dowebsitesneedtolookexactlythesameineverybrowser.com/)

### Нежелательно
```html
<p data-lines="3" class="abstract">Из сорока двух осужденных повстанцев, привезенных одновременно с Бладом на «Ямайском купце», двадцать пять купил Бишоп. Остальные были проданы другим плантаторам — в Спейгстаун и еще дальше на север. Какова была их судьба, Блад не знал; с рабами же Бишопа он общался все время и видел ужасные их страдания.</p>
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

### Предпочтительно
```html
<p class="abstract">Из сорока двух осужденных повстанцев, привезенных одновременно с Бладом на «Ямайском купце», двадцать пять купил Бишоп. Остальные были проданы другим плантаторам — в Спейгстаун и еще дальше на север. Какова была их судьба, Блад не знал; с рабами же Бишопа он общался все время и видел ужасные их страдания.</p>
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

## Предпочитайте нативное кастомному

Практически невозможно создать UX лучше, чем тот, который обеспечивают разработчики браузеров. У вас нет их ресурсов, ни временных, ни человеческих. Нет возможности найти все подводные камни, связанные с решением конкретной проблемы. Не говоря уже о том, что нативные элементы обычно обладают значительно лучшей производительностью.

1. Создание кастомного решения требует значительно больше времени, чем использование нативного.
2. Кастомное решение нельзя так же глубоко интегрировать с системой, как нативное.
3. Мы не контролируем сторонние зависимости. 
4. Сторонние решения часто негативно сказываются на размере бандла.
5. Нельзя предсказать, где возникнут проблемы в стороннем решении, насколько оно доступно, что с локализацией и интернационализацией. 
6. Нативным элементам не нужна загрузка JS-бандлов. А это значит, что их можно использовать, как только загружен HTML.
7. Производительность нативных элементов обычно значительно лучше, чем у кастомных.
8. Новые возможности появляются с обновлением браузера.
9. Разработчикам значительно легче работать с нативным решением, чем с кастомным. Нативное решение стандартизовано, а также хорошо и широко известно.

- [Do I need a custom select?](https://doineedacustomselect.com/)
- [Under the spotlight: Select](https://modulz.app/blog/under-the-spotlight-select)

### Нежелательно
```html
<div class="details">
  <h2>Алчность</h2>
  <div class="details-content">
    Каузак равнодушным и циничным взглядом окинул корчившееся в судорогах тело своего вожака. Возможно, дело кончилось бы совсем не так, будь Левасер человеком другого склада. Но тогда, очевидно, и капитан Блад применил бы к нему другую тактику. Сейчас же люди Левасера не питали к нему ни любви, ни жалости. Единственным их побуждением была алчность. Блад искусно сыграл на этой черте их характера, обвинив капитана «Ла Фудр» в самом тяжком преступлении — в присвоении того, что могло быть обращено в золото и поделено между ними.
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

### Предпочтительно
```html
<details>
  <summary>Алчность</summary>
  Каузак равнодушным и циничным взглядом окинул корчившееся в судорогах тело своего вожака. Возможно, дело кончилось бы совсем не так, будь Левасер человеком другого склада. Но тогда, очевидно, и капитан Блад применил бы к нему другую тактику. Сейчас же люди Левасера не питали к нему ни любви, ни жалости. Единственным их побуждением была алчность. Блад искусно сыграл на этой черте их характера, обвинив капитана «Ла Фудр» в самом тяжком преступлении — в присвоении того, что могло быть обращено в золото и поделено между ними.
</details>
```

## Валидный код предпочтительнее невалидного

Даже если в вашем браузере всё выглядит хорошо, в браузере пользователя страница может выглядеть сломанной, так как коррекция ошибок работает по-разному в разных браузерах. Кроме того, это может сбить с толку разработчиков, которые будут поддерживать этот код. Потенциально валидный HTML может быть лучше с точки зрения поисковой оптимизации и доступности.

- [Why Validate?](https://validator.w3.org/docs/why.html)
- [6 Reasons Why Google Says Valid HTML Matters](https://www.searchenginejournal.com/google-valid-html/)

### Нежелательно
```html
<dl>
  <h1>Словарь</h1>

  <dt>Секстант</dt>
  <dd>Навигационный измерительный инструмент, используемый для определения высоты Солнца и других космических объектов над горизонтом</dd>

  <dt>Ванты</dt>
  <dd>Снасти стоячего такелажа, которыми укрепляются мачты, стеньги и брам-стеньги с бортов судна</dd>

  <dt>Стаксель</dt>
  <dd>Треугольный парус</dd>
</dl>
```

### Предпочтительно
```html
<h1>Словарь</h1>

<dl>
  <dt>Секстант</dt>
  <dd>Навигационный измерительный инструмент, используемый для определения высоты Солнца и других космических объектов над горизонтом</dd>

  <dt>Ванты</dt>
  <dd>Снасти стоячего такелажа, которыми укрепляются мачты, стеньги и брам-стеньги с бортов судна</dd>

  <dt>Стаксель</dt>
  <dd>Треугольный парус</dd>
</dl>
```

## Предпочтительно разделять структуру и представление

Легче поддерживать код, в котором структура и представление разделены. Его проще читать и понимать. Это лучше с точки зрения доступности. Лучше с точки зрения поисковой оптимизации. 

- [Separation: The Web Designer’s Dilemma](https://alistapart.com/article/separationdilemma/)
- [Developing With Web Standards – Recommendations and best practices](https://www.456bereastreet.com/lab/developing_with_web_standards/structure/)
- [Separation of content and presentation](https://en.wikipedia.org/wiki/Separation_of_content_and_presentation)
- [G140: Separating information and structure from presentation to enable different presentations](https://www.w3.org/TR/WCAG20-TECHS/G140.html#:~:text=While%20presentational%20features%20visually%20imply,%2C%20paragraphs%2C%20lists%2C%20etc.&text=Providing%20separate%20structure%2C%20functionality%2C%20and,determined%20via%20the%20structure%20layer.)

### Нежелательно
```html
<nav class="breadcrumbs">
  <ol>
    <li><a href="/home/">Главная</a></li>
    <li>&rarr;</li>
    <li><a href="/home/cluster/">Кластер</a></li>
    <li>&rarr;</li>
    <li>Сервис</li>
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

### Предпочтительно
```html
<nav class="breadcrumbs">
  <ol>
    <li><a href="/home/">Главная</a></li>
    <li><a href="/home/cluster/">Кластер</a></li>
    <li>Сервис</li>
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
