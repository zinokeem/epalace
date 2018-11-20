package org.znkim.epalace.domain;


import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class Board {
    /* custom */
    private int rownum;
    private int sumCount;
    private int sumPage;
    private int page;
    private int startCount;
    private int offset;

    /* db columns */
    private int id;
    private String subject;
    private String content;
    private int usersid;
    private String usersname;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
    private Date created;
    private int hit;
}
