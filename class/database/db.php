<?php
/**
 * usage
 * @author:kofmax28@gmail.com
 * @date:2013-2-6 01:17:29
 */

class DB
{
	//private static final $__CLASS_NAME="DB";

	private $_db;
	private $_host;
	private $_port=3306;
	private $_user;
	private $_password;
	private $_currentDB="";

	private $_conn=null;


	function DB($host,$user,$pass)
	{
		$this->_host=$host;
		$this->_user=$user;
		$this->_password=$pass;
		
	}

	/*
	 * Connect to database by database's name
	 */
	function connectDB($dbName)
	{
		if($_conn!=null&&$dbName==$_currentDB)
		{
			return $_conn;
		}else
		{
			$_conn=mysql_connect($this->_host,$this->_user,$this->_password) or die("Unable to connect");
			mysql_select_db($dbName) or die("Unable to select db");
			$this->_currentDB=$dbName;
			return "success";
		}
	}
	
	function execute($query)
	{
	 	$result= mysql_query($query);
	 	$array=array();
	 	while($row=mysql_fetch_object($result))
	 	{
	 		$array[]=$row->name;
	 	}
	 	return $array;
	}
	
	
}