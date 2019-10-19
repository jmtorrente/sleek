---
layout: post
title: Lidar VS UltraSonic for Focus Fistance Calculus
featured-img: Leica
mathjax: true
---

# ARDUINO-BASED SYTEM FOR FOCUS DISTANCE ESTIMATION

## INTRODUCTION 
<p align="justify">
</p>
Why would anybody need a focus distance estimation nowadays! I mean every camera even those in our mobile phones have advanced and highly accurate focus systems that do not fail very often. So what is the end of this post.

Well, I'm a huge fan of analog photography (the title of the Blog clearly states that.... ;-)), and I suffer from GAS (Gear Acquisition Syndrome), I cannot resist the temptation of buying old cameras. I restore them and I use them, needless to say that I develope my own film and scan all the negatives in a dedicated flatbed scanner. I can also make positives out of these negatives with a meopta enlarger in my darkroom. But that is all  another matter which we may deal in the future.

Well, if you are familiar with old cameras like Rollei 35 family, older soviet Zorki and Kodak Retina for example. Then you will probably know that they do in all of them focus distance must be estimated, and they do not provide any feedback (most "modern" analog cameras do). For a long time, I have been thiking of developing my own distance calculator. Nowadays, there are plenty of approaches to this project. Since I already have an Ultrasound sensor and a Lidar, we will compare them and see which of them fits us better.

<figure>
    <div align = "center"><img src="https://images.unsplash.com/photo-1551818014-8279462338b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80" alt="Light" class="center">
    <figcaption>Fig 1. Kodak Retina analog camera..</figcaption>
    </div>
</figure>
<br/><br/>

## FIRST APPROACH: HC-SR04

HC-SR04 is a very cheap ultrasound sensor which can be bought in aliexpress <a href="https://es.aliexpress.com/item/32786781050.html?spm=a2g0o.productlist.0.0.db967825N5UgqK&algo_pvid=0de1859e-b11c-4018-902f-3458f6876546&algo_expid=0de1859e-b11c-4018-902f-3458f6876546-0&btsid=c006fa8d-54e8-4ec0-89c4-fb8e8c9f8a92&ws_ab_test=searchweb0_0,searchweb201602_10,searchweb201603_52">Aliexpress</a> for example for less than 2€ (delivery included).

The advantages of using this method, is mainly the power consumption which almost halves my TF-mini Lidar and also its low distance precision. Both sensor ranges are:

* Lidar: $\small 0.3m$ to $\small 12m$
* HC-SR04: $0.02m$ to $4.5m$

Obviously the main disadvantage is that it only measures up to 4.5m which seems to be a little low for camera focus distance. For example, my Zorki 1 goes from 1.2m up to 20m, so both method are a bit out of range in some way.

### HOW DOES A ULTRASOUND SENSOR WORK

It is very easy. Ultrasonic sensors are devices used for several purposes, in this case we will explain them for distance measurement. These sensor send a non-audible, high frequency pulse which rebounds on nearby objects and reflects into the sensor again, which "listens" to that frequency pulse and calculates the distance based on the sound speed and time it took the pulse to reach the microphone.

The sensor measures the elapsed time between the pulse is sent and when it later is received. We know that sound speed is around $343 m/s$ in normal conditions ($20ºC$, $50\%$ relative humidity and $101325 Pa$ pressure). So transforming units we have that:

$$
343\dfrac{m}{s}\cdot 100\dfrac{cm}{m}\cdot \dfrac{1}{1000000}\cdot\dfrac{s}{\mu s} = \dfrac{1}{29.2}\cdot \dfrac{cm}{\mu s}
$$

So from previous equation it can be extracted that this sound pulse may travel $`1 cm`$ every $`29.2 \mu/s`$, and so, following the following equation, it is possible to calculate traveled distance:

$$ 
TraveledDistance = \dfrac{ElapsedTime (\mu s)}{29.2}
$$

But we do not need the whole traveled distance, we just need the half of it and so:

$$
TraveledDistance = \dfrac{ElapsedTime (\mu s)}{58.4}
$$


 ## SECOND APPROACH:TF-MINI LIDAR


## DESIGN
<p align="justify">
</p>
<br/><br/>

## IMPROVEMENTS
<br/><br/>

## CONCLUSION


