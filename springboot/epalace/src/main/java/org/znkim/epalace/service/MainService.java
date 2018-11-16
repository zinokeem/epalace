package org.znkim.epalace.service;

import java.util.ArrayList;

import org.znkim.epalace.domain.Board;
import org.znkim.epalace.domain.PostObject;

public interface MainService {
    public ArrayList<PostObject> selectUserData();
    public Integer selectBoardCount();
    public ArrayList<Board> selectBoardList(Board board);
    public ArrayList<Board> selectBoard(Board board);
}
