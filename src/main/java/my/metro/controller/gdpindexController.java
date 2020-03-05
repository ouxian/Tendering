package my.metro.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by hk on 2018/9/3.
 */
@Controller
@RequestMapping("/")
public class gdpindexController {
    @RequestMapping("gdpindex")
    public String intoHomePage()
    {
        return "index/gdpindex";
    }

}
