package org.znkim.epalace.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.znkim.epalace.domain.Board;
import org.znkim.epalace.domain.PostObject;
import org.znkim.epalace.service.MainService;

@RestController
public class MainController {
    /* 서비스 연결 */
    @Autowired
    private MainService service;

    @RequestMapping(value="/maria", method=RequestMethod.POST)
    @ResponseBody
    public Object postMaria(PostObject postOject) {
        ArrayList<PostObject> result = service.selectUserData();
        return result;
    }

    @RequestMapping(value="/selectBoardCount", method=RequestMethod.POST)
    @ResponseBody
    public Object selectBoardCount(Board board) {
        Integer result = service.selectBoardCount();
        return result;
    }

    @RequestMapping(value="/selectBoardList", method=RequestMethod.POST)
    @ResponseBody
    public Object selectBoardList(Board board) {
        ArrayList<Board> result = service.selectBoardList(board);
        return result;
    }

    @RequestMapping(value="/selectBoard", method=RequestMethod.POST)
    @ResponseBody
    public Object selectBoard(Board board) {
        ArrayList<Board> result = service.selectBoard(board);
        return result;
    }
}
