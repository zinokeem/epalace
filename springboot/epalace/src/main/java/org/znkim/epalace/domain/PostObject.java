package org.znkim.epalace.domain;


import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostObject {
    private int id;
    private String name;
    private String nickname;
    private Date joinDate;
    private Date lastestDate;
    private String auth;
    private int userWeight;
}
