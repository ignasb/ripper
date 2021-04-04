import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { ILink } from "../models";

@Component({
  selector: "app-sidenav",
  templateUrl: "./sidenav.component.html",
  styleUrls: ["./sidenav.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent implements OnInit {
  links: ILink[] = [
    {
      icon: "search",
      path: "/search",
      title: "Search",
    },
    {
      icon: "backup",
      path: "/downloads",
      title: "Downloads",
    },
    {
      icon: "settings",
      path: "/settings",
      title: "Settings",
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  getRoute(link: ILink): string[] {
    return [link.path];
  }
}
