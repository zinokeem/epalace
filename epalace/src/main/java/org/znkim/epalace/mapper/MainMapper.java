package org.znkim.epalace.mapper;

import java.util.ArrayList;

import org.springframework.stereotype.Repository;
import org.znkim.epalace.domain.Board;
import org.znkim.epalace.domain.PostObject;

@Repository
public interface MainMapper {
    public ArrayList<PostObject> selectUserData();
    public Integer selectBoardCount();
    public ArrayList<Board> selectBoardList(Board board);
    public ArrayList<Board> selectBoard(Board board);
    public void insertBoard(Board board);
    public void deleteBoard(Board board);
}
