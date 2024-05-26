AFRAME.registerComponent("createmodels", {
  init: async function () {
    //Get the compund details of the element
    var models = await this.getModels();

    var barcodes = Object.keys(models);

    barcodes.map((barcode) => {
      var element = models[barcode];

      //Call the function
      this.createModels(element);
    });
  },
  getModels: function () {
    return fetch("js/model.json")
      .then((response) => response.json())
      .then((data) => data);
  },

  createModels: function (model) {
    var barcodeValue = model.barcode_value;
    var modelUrl = model.model_url;
    var modelName = model.model_name;

    var scene = document.querySelector("a-scene");

    var marker = document.createElement("a-marker");

    marker.setAttribute("type", "barcode");
    marker.setAttribute("value", barcodeValue);
    marker.setAttribute("model_name", modelName);
    marker.setAttribute("id", `marker-${modelName}`);
    marker.setAttribute("markerhandler", {});
    scene.appendChild(marker);

    if (barcodeValue === 0) {
      var modelEl = document.createElement("a-entity");
      modelEl.setAttribute("id", `${modelName}`);
      modelEl.setAttribute("geometry", {
        primitive: "box",
        width: model.width,
        height: model.height,
      });
      modelEl.setAttribute("position", model.position);
      modelEl.setAttribute("rotation", model.rotation);
      modelEl.setAttribute("material", {
        color: model.color,
      });
      marker.appendChild(modelEl);
    } else {
      var modelEl = document.createElement("a-entity");
      modelEl.setAttribute("id", `${modelName}`);
      modelEl.setAttribute("gltf-model", `url${modelUrl}`);
      modelEl.setAttribute("position", model.position);
      modelEl.setAttribute("rotation", model.rotation);
      modelEl.setAttribute("scale", model.scale);
      marker.appendChild(modelEl);
    }
  },
});
