package org.znkim.epalace.service.impl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.znkim.epalace.domain.Board;
import org.znkim.epalace.domain.PostObject;
import org.znkim.epalace.mapper.MainMapper;
import org.znkim.epalace.service.MainService;

@Service
public class MainServiceImpl implements MainService {
    @Autowired
    MainMapper mapper;

    @Override
    public ArrayList<PostObject> selectUserData() {
        ArrayList<PostObject> result = mapper.selectUserData();
        return result;
    }

    @Override
    public Integer selectBoardCount() {
        Integer result = mapper.selectBoardCount();
        return result;
    }

    @Override
    public ArrayList<Board> selectBoardList(Board board) {
        ArrayList<Board> result = mapper.selectBoardList(board);
        return result;
    }

    @Override
    public ArrayList<Board> selectBoard(Board board) {
        ArrayList<Board> result = mapper.selectBoard(board);
        return result;
    }

    @Override
    public void insertBoard(Board board) {
        mapper.insertBoard(board);
    }

    @Override
    public void deleteBoard(Board board) {
        mapper.deleteBoard(board);
    }
}
