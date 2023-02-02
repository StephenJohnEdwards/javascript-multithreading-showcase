## Showcase: Multi threading in web applications

### Descripition
> While delegating work to other threads is common in most backend languages it is rarely used
> in modern web applications. Reasons for this might be that most of the work intensive tasks
> are done either on server environments or via desktop applications.
> But with broader access to the internet via low budget devices like feature phones, low edge
> smartphones and even older devices optimizing performance can become a crucial task.
> With multithreading web applications it possible to keep the ui thread responsive and prevent
> the website from freezing.
> JavaScript offers the Web Workers API which provides a possibility to bring performance critical
> tasks to a background thread. (see: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
> This repository shows 4 different ways to gzip a file and download this compressed file.

### Getting Startet
> #### Requirements
> This demo was developed with node 18.13.0 but node 16.x should work as well (i have not tested this)
> #### Starting the app
> In the repo root run the following command
> > npm install
> 
> After the installation is done run
> > npm run dev
> 
> This will start the webpack dev server, and you can view the application under
> > http://localhost:4000

### The Example 
> By default, this method is selected when you freshly start the application. When selecting a file
> (50 - 100mb is a good size for observation) and clicking on ZIP it will get compressed to a gzip
> archive. This is achieved by the library pako (see: https://github.com/nodeca/pako). After the
> compression is completed the file will be downloaded via FileSave.js
> (see: https://github.com/eligrey/FileSaver.js/). The butten with the label "Add a green box" will
> add a new green div element underneath itself.

### The four implementations
> #### Single threaded (./src/app/single-thread.ts)
> During compression the ui thread will be blocked
> by pako for compressing your file and clicking the button for adding green boxes will not do
> anything. After the compression is done the green boxes should be added to the document.
> #### Multi threading with native api (./src/app/multi-thread-native.ts)
> This option demonstrates the usage of the native Web Workers API with postmessage() and an event 
> listener on the worker object. This implementation shows that threads do not have a shared API
> like Task.Run in C#.
> #### Multi threading with comlink (./src/app/multi-thread-comlink.ts)
> This option makes use of googles libary Comlink (see: https://github.com/GoogleChromeLabs/comlink) which
> makes the use of web workers way more convenient and easier to handle. It provides an RPC based approach
> of communicating between threads. This example shows how Comlink exposes a function from a script
> that runs in a worker.
> #### Multi threading with comlink proxy
> In this example comlink is used to expose a callback function in the worker which will be called
> when the file compression is done.
> 
> During all multithreading implementations the ui should stay responsive and the button for adding
> green boxes should not freeze.

### Disclaimer
> Everything in this repository is published under MIT license. Feel free to use / share / change the
> code in this repo. Be aware that this application uses cloneNode(true) to copy dom nodes which
> might cause memory leaks especially in older browsers.
