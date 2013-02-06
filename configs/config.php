<?php
include 'class/Smarty.class.php';

define('__SITE_ROOT','.');

$tpl=new Smarty();
$tpl->setTemplateDir(__SITE_ROOT."/templates/");
$tpl->setCompileDir(__SITE_ROOT."templates_c/");
$tpl->setConfigDir(__SITE_ROOT."/configs/");
$tpl->setCacheDir(__SITE_ROOT."/cache/");
$tpl->left_delimiter='<{';
$tpl->right_delimiter='}>';



?>