# HTML recommendations and best practices

## Prefer fewer elements over more elements

It is harder to read, understand, and maintain large HTML blocks. Another reason — large DOM can influence performance.

- [Avoid an excessive DOM size](https://web.dev/dom-size/)

### Bad
```html
<div>
  <p>Text.</p>
</div>
```

### Good
```html
<p>Text.</p>
```

## Prefer semantic elements over non-semantic

It easier to read, understand, and maintain semantic HTML. Also it's better for acessability, for example screen readers. And all kind of robots and parsers. Including search engine spiders. 

- [The practical value of semantic HTML](https://www.brucelawson.co.uk/2018/the-practical-value-of-semantic-html/)
- [HTML: A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)
- [Understanding why Semantic HTML is important, as told by TypeScript.](https://medium.com/@mandy.michael/understanding-why-semantic-html-is-important-as-told-by-typescript-bd71ad41e6c4)
- [The SEO Advantages of Machine-Readable HTML5 Semantic Markup](https://searchengineland.com/seo-advantages-of-machine-readable-html5-semantic-markup-314455)
- [Semantics in HTML 5](https://alistapart.com/article/semanticsinhtml5/)

### Bad
```html
<span>20 minutes ago.</span>
```

### Good
```html
<time datetime="2020-09-01T20:00:00">20 minutes ago.</time>
```

## Prefer progressive enhancement and simplification over hacky or complex solutions

This way we would get more stable and solid solutions while delivering best possible experience to the user.

- [Progressive Enhancement: What It Is, And How To Use It?](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)
- [Do websites need to look exactly the same in every browser?](http://dowebsitesneedtolookexactlythesameineverybrowser.com/)

### Bad
```html
<p data-lines="3" class="abstract">Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.</p>
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
    console.log(truncateTextParts.length, lines * lineHeight , truncateElement.clientHeight)
    truncateTextParts.pop();
    truncateElement.innerHTML = truncateTextParts.join(' ') + '...';
  }
</script>
```

### Good
```html
<p class="abstract">Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.</p>
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

## Prefer native over custom

It next to impossible deliver better UX then one, which was provided by browser vendors. You don't have vendor resources, both time and human, and rarely see all underwater rocks and aspects related to the specific problem. Also, native elements usually have much better performance.

- [Do I need a custom select?](https://doineedacustomselect.com/)

### Bad
```html
<div class="details">
  <h2>We are the working dead</h2>
  <div class="details-content">
    Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro.
  </div>
</div>
<script>
  const toggler = (event) => {
  console.log(event.currentTarget.nextElementSibling.classList)
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

### Good
```html
<details>
  <summary>We are the working dead</summary>
  Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro.
</details>
```

## Prefer valid over invalid

Even if it looks fine in your browser, it can look broken entirely in users' one because error correction can work differently in different browsers. Also, it could be misleading for developers who will maintain this code. Potentially valid HTML could be better for SEO and accessibility.

- [Why Validate?](https://validator.w3.org/docs/why.html)
- [6 Reasons Why Google Says Valid HTML Matters](https://www.searchenginejournal.com/google-valid-html/)

### Bad
```html
<dl>
  <h1>Dictionary</h1>

  <dt>Beast of Bodmin</dt>
  <dd>A large feline inhabiting Bodmin Moor.</dd>

  <dt>Morgawr</dt>
  <dd>A sea serpent.</dd>

  <dt>Owlman</dt>
  <dd>A giant owl-like creature.</dd>
</dl>
```

### Good
```html
<h1>Dictionary</h1>

<dl>
  <dt>Beast of Bodmin</dt>
  <dd>A large feline inhabiting Bodmin Moor.</dd>

  <dt>Morgawr</dt>
  <dd>A sea serpent.</dd>

  <dt>Owlman</dt>
  <dd>A giant owl-like creature.</dd>
</dl>
```

## Prefer presentation separated from structure

It is easier to maintain code where structure and presentation are separated. Easier to read and understand it. It is better from an accessibility perspective. Better for SEO. I can name reasons all day long.

- [Separation: The Web Designer’s Dilemma](https://alistapart.com/article/separationdilemma/)
- [Developing With Web Standards – Recommendations and best practices](https://www.456bereastreet.com/lab/developing_with_web_standards/structure/)
- [Separation of content and presentation](https://en.wikipedia.org/wiki/Separation_of_content_and_presentation)
- [G140: Separating information and structure from presentation to enable different presentations](https://www.w3.org/TR/WCAG20-TECHS/G140.html#:~:text=While%20presentational%20features%20visually%20imply,%2C%20paragraphs%2C%20lists%2C%20etc.&text=Providing%20separate%20structure%2C%20functionality%2C%20and,determined%20via%20the%20structure%20layer.)

### Bad
```html
<ol class="steps">
  <li>Step 1</li>
  <li>
    <div class="dashes">
      <div class="dash"></div>
      <div class="dash"></div>
      <div class="dash"></div>
      <div class="dash"></div>
      <div class="dash"></div>
    </div>
  </li>
  <li>Step 2</li>
</ol>
<style>
  .steps {
    list-style: none;
    display: flex;
    align-items: center;
  }
  .dashes {
    display: flex;
    margin: 0 5px;
  }
  .dash {
    width: 6px;
    height: 2px;
    background: red;
    margin: 0 5px 0 0;
  }
  .dash:last-child {
    margin-right: 0;
  }
</style>
```

### Good
```html
<ol class="steps">
  <li class="step">Step 1</li>
  <li class="step">Step 2</li>
</ol>

<style>
  .steps {
    list-style: none;
    display: flex;
    align-items: center;
  }
  .step {
    position: relative;
    margin-right: 60px;
  }
  .step::after {
    content: "";
    display: block;
    position: absolute;
    left: 100%;
    top: 50%;
    width: 50px;
    margin-left: 5px;
    margin-top: -1px;
    border-top: 2px dashed red;
  }
  .step:last-child::after {
    display: none;
  }
</style>
```
