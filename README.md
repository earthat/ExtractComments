# ExtractComments
This repository code extract the comments from all MATLAB codes in a directory and generate the PDF report

The code is takes the input as the code directory path and image path. The image is teh code sequence diagaram or code dependency diagram from the code borrowed from Dohyun Kim / CC BY-NC. The function 'ExtractComments' is developed inhouse at https://free-thesis.com which is a report generation script and helped us to share the code details to share wth client and to keep it with us for future usage. 

### Syntax
```
ExtractComments(directory,impath)
```
# Convert the extracted function description and write into JSON schema for the anygraph's network graph
The `testingJSON.mlx` writes the graph matrix into JSON schema for the anygraph plot. The function dependency will look like
![](./html/mainhtml.svg)

