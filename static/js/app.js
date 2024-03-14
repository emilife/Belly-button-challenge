const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const selector = d3.select("#selDataset");

d3.json(url).then(({names})=>{
  names.forEach(name => {
    selector.append("option").text(name);   
  });

  optionChanged(names[0])
});




function optionChanged(nameIndex){
  
  d3.json(url).then(({metadata,samples}) => {

    let meta = metadata.find(obj => obj.id == nameIndex);
    let {otu_ids, sample_values, otu_labels} = samples.find(obj => obj.id == nameIndex);

    d3.select('.panel-body').html('');
    Object.entries(meta).forEach(([key,val]) => {
      d3.select('.panel-body').append('h4').text(`${key.toUpperCase()}: ${val}`);
    });

    var data = [{
      type: 'bar',
      x: sample_values.slice(0,10).reverse(),
      y:  otu_ids.slice(0,10).map(otuid=>`OTU ${otuid}`).reverse(), 
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
    

  });
};