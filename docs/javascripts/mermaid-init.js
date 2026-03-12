document$.subscribe(function () {
  mermaid.initialize({
    startOnLoad: true,
    theme: "default"
  });

  mermaid.init(undefined, document.querySelectorAll(".mermaid"));
});