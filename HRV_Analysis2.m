%% This program will calculate the heart rate varaibility 
clear all; clc; close all; 

% heart rate variability is the time interval between heartbeats 

%% Import the data from sensor 
% multiple data sets are imported because we want longer data sets 
% note, our current data set is not long enough for accurate readings, would require a 24hr reading
load('100m (1).mat')
a = val(1, 1:end);

load('100m (2).mat')
b = val(1, 1:end);

load('100m (3).mat')
c = val(1, 1:end);

load('100m (4).mat')
d = val(1, 1:end);

load('100m (5).mat')
e = val(1, 1:end);

load('100m (6).mat')
f = val(1, 1:end);

load('100m (7).mat')
g = val(1, 1:end);

load('100m (8).mat')
h = val(1, 1:end);

load('100m (9).mat')
k = val(1, 1:end);

% combine the data
y = [a b c d e f g h k]';

% determine the time scale of the data; with actual implementation, we
% would need to determine how long device has been measuring data
n=length(y);
t=linspace(0,9000,n); %a measurement of 90 sec long 

% find where the R peaks are in the QRS complex
[peak,location]=findpeaks(y,'MinPeakHeight',1050); 
% location gives the index at what time the peak is 
% peak gives the y level for what the max is

%finding the times of the R peaks 
peakLocation = t(location);

% plot the ECG data and R peaks
figure(1)
plot(t,y,'k')
hold on
plot(peakLocation,peak,'mo')
xlabel('time (ms)')
title("QRS Complex over 90 seconds")

% use time domain methods to find heart rate variability and other
% associated statistics 

HRV = diff(peakLocation); %heart rate variability in ms 
heartRate = 6000/mean(HRV); %in beats per minute


%% Calculating SDNN and SDNN5
% for SDNN between 0 and 50 indicates a 400% higher risk for morbidity than a SDNN between 50 and 100 
SDNN = std(HRV); 

% in reality, want to calculate SDNN over 24 hours using 5 minute intervals, but not enough
% data present

% we shall use some dummy data and a smaller time scale and show proof of
% concept

% how long data was collected for
hours = 1;
t = [1:hours*60*60*1000]; %in ms

% dummy data, this assumes that the data is scaled to the time, which may
% not be true with actual NN interval data; but we shall use this for
% simplicity sake
data = linspace(1,100,length(t));

% calculate the time interval in ms and how many intervals that would be
% for time span
dataLength = length(data);
timeInterval = 300000; % ms, equals to 5 minutes
numSegments = dataLength/timeInterval; %how many segments will be generated from 5 minute intervals

% intialize vector holding time bins for data
dataCatfor = zeros(numSegments,timeInterval);

% take every nth element and store it a column vector, concatenate column
% vectors so that data within the time interval is together horizontally
for j = 1:timeInterval
    dataCatfor(1:numSegments,j) = data(j:timeInterval:end)'; %holds the data for every 5 minutes but in ms
end

%intialize vector holding means of each time bin
meanVector = zeros(1,numSegments);

% calculate the mean of inputs in each time bin
for i = 1:numSegments
meanVector(i) = mean(dataCatfor(i,1:timeInterval)); % mean times (min) within 5 min intervals
end

% calculate the standard deviation from all the means
SDDN5 = std(meanVector); 


%% Calculating RMSSD
%Find the mean of the squares of NN intervals
%Then find the standard deviation for this value 
% used for parasympathetic activation and marker for cardiac dsyfunction 
HRVsquared = HRV.^2;
RMSSD = sqrt(mean(HRVsquared));

% HRV holds at the NN intervals, or the time between each peak (R) 


%% Calculating NN50 and pNN50
% finding how many NN intervals is over 50 ms 

%initalize countern
NN50 = 0;
n1 = length(HRV);

for i = 1:n1
    if HRV(i) > 50
        NN50 = NN50 + 1;
    end
end

% find the proportion of NN50s to the total number of NN intervals 
pNN50 = (NN50/n1) * 100; % as a percentage


%% Displaying Results
fprintf('The heart rate is %f beats per min', heartRate)
fprintf('\nThe standard deviation of NN interval (ms) is %f', SDNN)
fprintf('\nThe root mean square of successive differences %f', RMSSD)
fprintf('\nThe proportion of differences in interbeat intervals between successive pairs of beats >50 ms is %f%%', pNN50)
fprintf('\nThe standard deviation of 5 minute averages of NN intervals is %f. (Note: uses fake data)\n', SDDN5)
