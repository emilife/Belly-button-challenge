function init(){
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
selector = d3.select("#selDataset")
d3.json(url).then((data)=>{
    names = data.names
    for (let i = 0; i < names.length; i++) {
    selector.append("option").text(names[i]).property("value", i);   
    }
})



build_charts(0)

}


function build_charts(nameIndex){
d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data)=>{
console.log(data)

let samples = data.samples
console.log(samples)
let person1 = samples[0]
console.log(person1)
let otu_ids = person1.otu_ids
console.log(otu_ids)
let sample_values = person1.sample_values
let otu_labels = person1.otu_labels
let y_values = otu_ids.slice(0,10).map(otuid=>`OTU ${otuid}`).reverse()


var data = [{
    type: 'bar',
    y: y_values, 
    x: sample_values.slice(0,10).reverse(),
    orientation: 'h' ,
    text:otu_labels.slice(0,10).reverse()
  }];
  
  Plotly.newPlot('bar', data);

var bubble = {
  x: otu_ids,
  y: sample_values,
  text:otu_labels,
  mode: 'markers',
  marker: {color: otu_ids,
    size: sample_values
  }
};

var data = [bubble];

var layout = {
  title: 'bubble',
  showlegend: false
 
};

Plotly.newPlot('bubble', data, layout);

console.log(nameIndex);
let demobox = d3.select("#sample-metadata");
let demolist = data.metadata[nameIndex];
for (let key in demolist) {
   demobox.append("p").text(`${key}: ${demolist[key]}`) ;
//    let y_values = otu_ids.slice(0,10)(otuid=>`OTU ${otuid}`
   
    }

});

}
init()


function optionChanged(nameIndex){
build_charts (nameIndex);




}