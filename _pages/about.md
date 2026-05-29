---
permalink: /
title: "About me"
excerpt: "About me"
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

Robotics + ML researcher building intelligent embodied systems 

I am a masters student at [Mila](https://mila.quebec/en) and the [Université de Montréal](https://www.umontreal.ca/en/), supervised by [Prof. Glen Berseth](https://neo-x.github.io/) at the [Robotics and Embodied AI Lab (REAL)](http://montrealrobotics.ca/). My interests lie at the intersection of robotics and machine learning. 

When I am not working you can find me hiking, running, or photographing abandoned buildings.

I thrive in fast-moving teams taking on the biggest challenges in robotics. [Let's talk](https://calendly.com/artur-kurams/30min)!

Publications
======

{% include base_path %}

<table id="publications" style="width:100%;border:0px;border-spacing:0px;border-collapse:separate;margin-right:auto;margin-left:auto;">
<tbody>
  {% for post in site.publications reversed %}
    {% if post.show %}
      {% include archive-single.html %}
    {% endif %}
  {% endfor %}
</tbody>
</table>

Experience
======

<table id="experiences" style="width:100%;border:0px;border-spacing:0px;border-collapse:separate;margin-right:auto;margin-left:auto;">
<tbody>
  {% for post in site.experiences %}
    {% if post.show != false %}
      {% include archive-single-cv.html %}
    {% endif %}
  {% endfor %}
</tbody>
</table>

Projects
======

<table id="projects" style="width:100%;border:0px;border-spacing:0px;border-collapse:separate;margin-right:auto;margin-left:auto;">
<tbody>
  {% for post in site.projects %}
    {% if post.show != false %}
      {% include archive-single-project.html %}
    {% endif %}
  {% endfor %}
</tbody>
</table>


Hobbies
======

<table id="hobbies" style="table-layout:fixed;width:100%;border:0px;border-spacing:0px;border-collapse:separate;margin-right:auto;margin-left:auto;">
<tbody>
  <tr style="height: 200px;">
    {% for post in site.hobbies %}
      {% include archive-single-hobby-img.html %}
    {% endfor %}
  </tr>
  <tr style="height: 200px;">
    {% for post in site.hobbies %}
      {% include archive-single-hobby-desc.html %}
    {% endfor %}
  </tr>
</tbody>
</table>


