const AppView = (function(){

	function create(){
		var appView = {};
		bind(appView);
		appView.init();
		return appView;
	};

	function bind(appView){
		appView.installServiceWorker = installServiceWorker.bind(appView);
		appView.serviceWorkerInstalled = serviceWorkerInstalled.bind(appView);
		appView.serviceWorkerInstallFailed = serviceWorkerInstallFailed.bind(appView);
		appView.cacheDom = cacheDom.bind(appView);
		appView.attachEvents = attachEvents.bind(appView);
		appView.input = input.bind(appView);
    appView.resize = resize.bind(appView);
		appView.init = init.bind(appView);
	}

	function installServiceWorker(){
		if("serviceWorker" in navigator){
			navigator.serviceWorker.register("service-worker.js", {scope: "./"})
				.then(this.serviceWorkerInstalled)
				.catch(this.serviceWorkerInstallFailed);
		}
	}

	function serviceWorkerInstalled(registration){
		console.log("App Service registration successful with scope:", registration.scope);
	}

	function serviceWorkerInstallFailed(error){
		console.error("App Service failed to install", error);
	}

	function cacheDom(){
		this.dom = {};
		this.dom.canvas = document.querySelector("#canvas");
		this.dom.input = document.querySelector("#input");
    this.dom.strokeStyle = document.querySelector("#stroke-style");
    this.dom.strokeWidth = document.querySelector("#stroke-width");
    this.dom.fillColor = document.querySelector("#fill-color");
	}

	function attachEvents(){
		this.dom.input.addEventListener("input", this.input);
    this.dom.strokeStyle.addEventListener("input", this.input);
    this.dom.strokeWidth.addEventListener("input", this.input);
    this.dom.fillColor.addEventListener("input", this.input);
    window.addEventListener("resize", this.resize);
	}

	function input(){
		let value = this.dom.input.value;
		let instructionList = this.svgPathParser.parsePath(value);
		instructionList = this.instructionSimplifier.simplifyInstructions(instructionList);
		this.canvasRenderer.clear();
		this.canvasRenderer.drawInstructionList(instructionList, {
      strokeColor : this.dom.strokeStyle.value,
      strokeWidth : this.dom.strokeWidth.value,
      fillColor : this.dom.fillColor.value
    });
	}

  function resize(){
    let canvasEdges = this.dom.canvas.getBoundingClientRect();

    this.dom.canvas.width = canvasEdges.width;
    this.dom.canvas.height = canvasEdges.height;
    this.input();
  }

	function init(){
		//this.installServiceWorker();
		this.cacheDom();
		this.attachEvents();
		this.svgPathParser = SvgPathParser.create();
		this.instructionSimplifier = InstructionSimplifier.create();
		this.canvasRenderer = CanvasRenderer.create({
			canvas : this.dom.canvas
		});
    this.resize();
	}

	return {
		create : create
	};

})();
