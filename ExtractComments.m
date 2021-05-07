function ExtractComments(directory,impath)
% genDep generates dependency graph
%
% <SYNTAX>
%   GG = ExtractComments(directory,impath);
%
% <DESCRIPTION>
% ExtractComments(directory) Extract Comments for given directory
% including its subfolder.

%
% <INPUT>
%     - directory (string)
%          directory name to generate extract comments. defualt: current folder
% 
% ##3==========developed by free-thesis.com
% disclaimer: part of the code is borrowed from the dependecny graph
% generator code of Dohyun Kim / CC BY-NC
%% report generator
import mlreportgen.report.*;
import mlreportgen.dom.*;
%% PARSING

if nargin == 0
    directory = pwd;
end
directory = strrep(directory,filesep,'/');
files = dir(sprintf('%s/**/*.m',directory)); % get all matlab files

[dirnames{1:length(files)}] = files.folder;
[filenames{1:length(files)}] = files.name;

dirnames = strrep(dirnames, filesep, '/');
filenames = strrep(filenames, '.m', '');
if length(unique(filenames)) ~= length(filenames)
    warning('A repeated filename detected. The result may not be accurate.')
    [ufilenames,~,bak] = unique(filenames);
    warning(['Repeated names: ', ...
        sprintf('%s, ', ufilenames{accumarray(bak,1,[length(ufilenames),1])>1}), ...
        sprintf('\b\b')]);
end

if any(cellfun(@iskeyword,filenames))
    warning('A keyword name detected')

    warning(['Keyward names: ', ...
        sprintf('%s, ', filenames{cellfun(@iskeyword,filenames)}), ...
        sprintf('\b\b')]);
end

nrfiles = length(filenames);

clearvars files
%% Report Title is the directory name
temp = strsplit(directory,'/');
rpt = Report([directory ,'/',temp{end}],"pdf");
rpt.Layout.Landscape = true;

if nargin==2
    tp=TitlePage("Title","Codes File Sequence","Image",impath,"Author","  "); % add title page image
else
    tp=TitlePage("Title","Codes File Sequence","Author","  "); % add title page image

end
add(rpt,tp)
toc=TableOfContents; % ad table of contents
add(rpt,toc)
%% GENERATE DEPENDENCY

fprintf('\nAnalyzing file ')

paths = cell(size(filenames));
counting_string = '';

for n = 1:nrfiles
    filename = [dirnames{n}, '/', filenames{n}, '.m'];
    paths{n} = strrep(filename, [directory, '/'], '');

    old_numbering_string_length = length(counting_string);
    counting_string = sprintf('%i/%i: %s', n, nrfiles, paths{n});
    fprintf(1, [repmat('\b', 1, old_numbering_string_length), '%s'],  counting_string)

    % read m-file
    fid = fopen(filename);
    filecontent = fread(fid, '*char').';
    
    fclose(fid);
    fid = fopen(filename);
    filecontent_int = fread(fid);
    index=find(filecontent_int==10); % index for the keyboard enter. 37 is the ascii character
    fclose(fid);
    % extract the comments
    % write the chapter as per files in the project directory 
    ch1 = Chapter("Title", [filenames{n},'_Comments']);
    matches = regexpi(filecontent,'%');
    if ~isempty(matches)
        matches(1)=[];
        for ii=1:numel(matches)-1
            temp = index(index>matches(ii));
            p1=Text(filecontent(matches(ii)+1:temp(1)));
            add(ch1,p1)
        end
    end
    add(rpt,ch1)
end
close(rpt)
