package org.znkim.epalace.controller;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.znkim.epalace.domain.PostObject;

@RestController
public class RestControllerTest {

    @RequestMapping(value="/get", method=RequestMethod.GET)
    public String get() {
        return "request get";
    }

    @RequestMapping(value="/post", method=RequestMethod.POST)
    @ResponseBody
    public Object post(PostObject postObject) {
        postObject.setId(15);
        postObject.setName("moose");
        return postObject;
    }
}
