package com.netlink.rsk;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.List;

@ComponentScan(basePackages = {"com.netlink.*","com.netlink.email.*"})
@EnableJpaRepositories(basePackages = {"com.netlink.rsk.repository"})
@SpringBootApplication
@EnableSwagger2
public class RajyaShikshaKendraApplication extends SpringBootServletInitializer {
	@Bean
	public Docket Swggerapi (){
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.any())
				.paths(PathSelectors.any())
				.build();
	}

	public static void main(String[] args) {
		SpringApplication.run(RajyaShikshaKendraApplication.class, args);
	}
}
