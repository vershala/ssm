package com.wss.dao.role;

import com.wss.model.role.Role;

public interface RoleMapper {

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_role
     *
     * @mbggenerated Thu Jun 15 10:19:22 CST 2017
     */
    int deleteByPrimaryKey(String roleCd);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_role
     *
     * @mbggenerated Thu Jun 15 10:19:22 CST 2017
     */
    int insert(Role record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_role
     *
     * @mbggenerated Thu Jun 15 10:19:22 CST 2017
     */
    int insertSelective(Role record);


    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_role
     *
     * @mbggenerated Thu Jun 15 10:19:22 CST 2017
     */
    Role selectByPrimaryKey(String roleCd);


    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_role
     *
     * @mbggenerated Thu Jun 15 10:19:22 CST 2017
     */
    int updateByPrimaryKeySelective(Role record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table tb_role
     *
     * @mbggenerated Thu Jun 15 10:19:22 CST 2017
     */
    int updateByPrimaryKey(Role record);
}