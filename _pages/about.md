---
permalink: /
title: "About me"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Hello! I am currently in my last year of undergraduate studies at the University of Toronto studying Computer Science with a specialization in Computer Vision. My interests lie at the intersection of robotics and machine learning. When I am not working you can find me training Brazilian Jiu-Jitsu, running, or [photographing abandoned buildings](https://www.instagram.com/urbanexplo/).

Experience
======
{% include base_path %}

<table id="experiences" style="width:100%;border:0px;border-spacing:0px;border-collapse:separate;margin-right:auto;margin-left:auto;">
<tbody>
  {% for post in site.experiences %}
    {% include archive-single-cv.html %}
  {% endfor %}
</tbody>
</table>

Projects
======

<table id="projects" style="width:100%;border:0px;border-spacing:0px;border-collapse:separate;margin-right:auto;margin-left:auto;">
<tbody>
  {% for post in site.projects %}
    {% include archive-single-project.html %}
  {% endfor %}
</tbody>
</table>

Awards
======

