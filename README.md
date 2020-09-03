# HTML Guide

## Prefer fewer elements over more elements

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

### Bad
```html
<span>20 minutes ago.</span>
```

### Good
```html
<time datetime="2020-09-01T20:00:00">20 minutes ago.</time>
```

## Prefer progressive enhancement and simplification over hacky or complex solutions

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
