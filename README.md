# React comment box example

### This is the React tutorial rewritten to use Compojure as the server. Here is the original [https://github.com/petehunt/react-tutorial](https://github.com/petehunt/react-tutorial). I extracted the jsx source into the file src/js/test.js.

##This is the React comment box example from [the React tutorial](http://facebook.github.io/react/docs/tutorial.html).

## Setting things up

- Install Clojure and lein
- The js source is located here *src/js/test.js* and is in jsx format
- Install node - Needed if you edit the js source(optional)
- Install jsx(optional). You'll need jsx if you edit the js source.
- (optional) If you modify the js source you'll have to run the jsx compiler
- (optional) To run the jsx compiler, run  ./jsx_watch.sh

## To use


```
lein deps
lein ring server
```

And visit http://localhost:3000/. Try opening multiple tabs!
